
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath:'api',
    baseQuery: fetchBaseQuery({baseUrl:'https://melabus.herokuapp.com/',
                                credentials:'include',
                                }),
    tagTypes:['Users'],
    endpoints: (builder) => ({
        getDrivers: builder.query({
         query: (role:string) =>`getuserbyrole?role=${role}`,
         providesTags:['Users'],
        }),
        addNewUser: builder.mutation({
            query:newUser=>({
                url: "registerorganizationuser",
                method:'POST',
                body:newUser,
            }),
            invalidatesTags:['Users'],
        })
    })
})
export const {
    useGetDriversQuery,
    useAddNewUserMutation,
} = apiSlice