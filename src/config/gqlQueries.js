import { gql } from '@apollo/client';

export const queries = {
    createMovies: gql`
        mutation MOVIE_MUTATION(
        $name: String!
        $description: String!,
        $actorInfo: String!
        )   {
            movie(name: $name, description:$description, actorInfo: $actorInfo) {
              id
              name
              description
              actorInfo
            }
        } `,
    updateMovies : gql`
        mutation UPDATE_MOVIE_MUTATION(
        $movieId: ID!
        $rating: Float!
        )   {
            addRatingToMovie(rating: $rating, movieId:$movieId) {
            id
            movieId
            rating
            }
        }`,
    fetchMovie: gql`
        query MovieFetch($filter: String, $limit: Int, $page: Int) {
          movie(filter: $filter, limit: $limit, page: $page) {
              totalPages
              page
              movie{
              id
              name
              actorInfo
              description
              rating {
                    id
                    rating
                  }
              }
            }
          } 
        `,
    subscriptionMovie:  gql`
        subscription {
          movieAdded {
            id
            name
            description
          }
        }
        `,
    eyeTest: gql`
        mutation EYE_MUTATION( $score2: Float! $score3: Float! ){
          eyeTest(score2: $score2, score3: $score3) {
          id
          }
        }`

}