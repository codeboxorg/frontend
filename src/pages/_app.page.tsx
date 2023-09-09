import { StyleProvider } from '@ant-design/cssinjs'
import PageLoading from '@components/core/PageLoading'
import { DefaultPageLayout } from '@components/on-demand/layout'
import { AntdContextRoot, GA, AuthChecker, SEO, SSRErrorHandleContainer } from '@components/utils'
import { ALLOWED_ONLY_TO_MEMBERS } from '@constants/route'
import { COLOR } from '@styles/color'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConfigProvider } from 'antd'
import { NextComponentType, NextPageContext } from 'next'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import wrapper from 'src/store/configureStore'
import '../styles/globals.scss'

type PagePermissionInfoEnabledComponentConfig = {
    permission: PagePermissionInfo
}

type NextComponentWithPermission = NextComponentType<NextPageContext, any, unknown> &
    Partial<PagePermissionInfoEnabledComponentConfig>

interface CustomAppProps extends AppProps {
    Component: NextComponentWithPermission
}

function App({ Component, pageProps, router: { route } }: CustomAppProps) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnWindowFocus: false,
                        retry: 2,
                    },
                },
            }),
    )

    const isPermissionRequired = ALLOWED_ONLY_TO_MEMBERS.some((path) => route.startsWith(path))

    const pagePermissionInfo = {
        role: Component.permission?.role ?? 'member',
        loadingFallback: Component.permission?.loadingFallback ?? <PageLoading />,
        redirect: Component.permission?.redirect ?? '/login',
    }

    return (
        <QueryClientProvider client={queryClient}>
            <SEO />
            <GA.TrackingRoutePath />
            <AuthChecker />
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: COLOR.primary,
                    },
                }}
            >
                <StyleProvider hashPriority='high'>
                    <AntdContextRoot />
                    <DefaultPageLayout>
                        <SSRErrorHandleContainer
                            error={pageProps.error}
                            pagePermissionInfo={pagePermissionInfo}
                            isPermissionRequired={isPermissionRequired}
                        >
                            <Component {...pageProps} />
                        </SSRErrorHandleContainer>
                    </DefaultPageLayout>
                </StyleProvider>
            </ConfigProvider>
        </QueryClientProvider>
    )
}

export default wrapper.withRedux(App)
