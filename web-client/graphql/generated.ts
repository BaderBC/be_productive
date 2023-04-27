import client from "undefined";
import type {
        
      } from "@apollo/client";
import { readable } from "svelte/store";
import type { Readable } from "svelte/store";
import gql from "graphql-tag"
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type ActivityType = {
  __typename?: 'ActivityType';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  is_active: Scalars['Boolean'];
  name: Scalars['String'];
  session_start?: Maybe<Scalars['DateTime']>;
  time_spent_ms: Scalars['Int'];
  time_to_spend_weekly: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  allActivities: Array<ActivityType>;
  unfinishedActivities: Array<ActivityType>;
};


