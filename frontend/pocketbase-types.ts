/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Articles = "articles",
	Authors = "authors",
	Resources = "resources",
	Tags = "tags",
	Users = "users",
	Videos = "videos",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type ArticlesRecord = {
	title: string
	url: string
	tags: RecordIdString[]
	description: string
	publishedAt?: IsoDateString
	author: RecordIdString
}

export type AuthorsRecord = {
	name: string
	articles?: RecordIdString[]
	videoes?: RecordIdString[]
}

export type ResourcesRecord = {
	name: string
	url: string
	description: string
}

export type TagsRecord = {
	name: string
}

export type UsersRecord = {
	name?: string
	avatar?: string
}

export type VideosRecord = {
	title: string
	url: string
	tags: RecordIdString[]
	description: string
	publishedAt?: IsoDateString
	author: RecordIdString
}

// Response types include system fields and match responses from the PocketBase API
export type ArticlesResponse<Texpand = unknown> = ArticlesRecord & BaseSystemFields<Texpand>
export type AuthorsResponse<Texpand = unknown> = AuthorsRecord & BaseSystemFields<Texpand>
export type ResourcesResponse = ResourcesRecord & BaseSystemFields
export type TagsResponse = TagsRecord & BaseSystemFields
export type UsersResponse = UsersRecord & AuthSystemFields
export type VideosResponse<Texpand = unknown> = VideosRecord & BaseSystemFields<Texpand>

export type CollectionRecords = {
	articles: ArticlesRecord
	authors: AuthorsRecord
	resources: ResourcesRecord
	tags: TagsRecord
	users: UsersRecord
	videos: VideosRecord
}