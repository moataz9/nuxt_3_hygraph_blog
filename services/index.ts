import { apolloClient } from '@/apolloClient'
import { provideApolloClient, useMutation, useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

provideApolloClient(apolloClient)

export const getHomePosts = async () => {
  const query = gql`
    query getPosts {
      postsConnection {
        edges {
          node {
            id
            author {
              bio
              id
              name
              photo {
                url
              }
            }
            createdAt
            slug
            title
            excerpt
            featuredImage {
              url
            }
            categories {
              name
              slug
            }
          }
        }
      }
    }
  `
  return useQuery(query)
}

export const getCategories = async () => {
  const query = gql`
    query getCategories {
      categories {
        id
        name
        slug
      }
    }
  `
  return useQuery(query)
}

export const getSimilarPosts = async (categoriesNames?: string[], slug?: string) => {
  const query = gql`
    query getSimilarPosts($slug: String!, $categories: [String!]) {
      posts(where: { slug_not: $slug, AND: { categories_some: { slug_in: $categories } } }, last: 3) {
        id
        title
        createdAt
        slug
        featuredImage {
          url
        }
      }
    }
  `
  return useQuery(query, { categories: categoriesNames, slug })
}

export const getRecentPosts = async () => {
  const query = gql`
    query getRecentPosts {
      posts(orderBy: createdAt_ASC, last: 3) {
        id
        title
        slug
        createdAt
        featuredImage {
          url
        }
      }
    }
  `
  return useQuery(query)
}

export const getPostContent = async (slug: string) => {
  const query = gql`
    query getPostContent($slug: String!) {
      post(where: { slug: $slug }) {
        author {
          id
          bio
          name
          photo {
            url
          }
        }
        createdAt
        slug
        title
        excerpt
        featuredImage {
          url
        }
        categories {
          id
          name
          slug
        }
        content {
          json
        }
      }
    }
  `
  return useQuery(query, { slug })
}

export const addComment = async (name: string, email: string, comment: string, slug: string) => {
  const mutation = gql`
    mutation createComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
      createComment(
        data: { name: $name, email: $email, comment: $comment, post: { connect: { slug: $slug } } }
      ) {
        id
      }
    }
  `
  return useMutation(mutation, { variables: { name, email, comment, slug } })
}

export const getComments = async (slug: string) => {
  const query = gql`
    query getComments($slug: String!) {
      comments(where: { post: { slug: $slug } }) {
        id
        name
        createdAt
        comment
      }
    }
  `
  return useQuery(query, { slug })
}

export const getFeaturedPosts = async () => {
  const query = gql`
    query getFeaturedPosts {
      posts(where: { featuredPost: true }, last: 10) {
        id
        author {
          name
          photo {
            url
          }
        }
        featuredImage {
          url
        }
        title
        slug
        createdAt
      }
    }
  `
  return useQuery(query)
}
