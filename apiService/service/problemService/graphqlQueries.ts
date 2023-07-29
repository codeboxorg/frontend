import { gql } from 'graphql-request'

export const PROBLEMS = gql`
    query Problems($pageNum: Int) {
        getProblems(limit: 20, offset: $pageNum) {
            content {
                id
                title
                submission
                accepted
            }
            pageInfo {
                totalPage
            }
        }
    }
`

export const PROBLEM_DETAIL = gql`
    query ProblemDetail($id: ID) {
        problem(id: $id) {
            id
            maxCpuTime
            maxMemory
            title
            context
            submission
            accepted
            tags {
                id
                name
            }
            languages {
                id
                name
                extension
            }
        }
    }
`

export const PROBLEM_SUBMIT = gql`
    mutation ProblemSubmit($submit: CreateSubmissionInput!) {
        createSubmission(input: $submit) {
            sourceCode
            id
        }
    }
`
