
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserRole {
    User = "User",
    Moderator = "Moderator",
    Administrator = "Administrator"
}

export enum UserKind {
    Local = "Local",
    Google = "Google",
    Facebook = "Facebook"
}

export enum VerifyStatus {
    Pending = "Pending",
    Approved = "Approved",
    Rejected = "Rejected"
}

export class SignInInput {
    clientId: string;
    email: string;
    password: string;
}

export class User {
    userId: string;
    email?: Nullable<string>;
    password?: Nullable<string>;
    avatarUrl?: Nullable<string>;
    phoneNumber?: Nullable<string>;
    balance: number;
    role: UserRole;
    walletId?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    birthday?: Nullable<Date>;
    verified: boolean;
    kind: UserKind;
    externalId?: Nullable<string>;
}

export class AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export class Response {
    data: User;
    tokens: AuthTokens;
}

export abstract class IQuery {
    abstract users(): User[] | Promise<User[]>;

    abstract init(): Response | Promise<Response>;

    abstract signIn(input: SignInInput): Response | Promise<Response>;

    abstract findById(input: string): FindByIdResponse | Promise<FindByIdResponse>;
}

export abstract class IMutation {
    abstract verifyGoogleAccessToken(input: string): Response | Promise<Response>;
}

export abstract class ISubscription {
    abstract userCreated(): Nullable<User> | Promise<Nullable<User>>;
}

export class CourseIncludes {
    time?: Nullable<number>;
}

export class FindByIdResponse {
    courseId?: Nullable<string>;
    title?: Nullable<string>;
    thumbnailUrl?: Nullable<string>;
    description?: Nullable<string>;
    price?: Nullable<number>;
    verifyStatus?: Nullable<VerifyStatus>;
    isDraft?: Nullable<boolean>;
    creatorId?: Nullable<string>;
    isDeleted?: Nullable<string>;
    previewVideoUrl?: Nullable<string>;
    targets?: Nullable<string>;
    includes?: Nullable<CourseIncludes>;
}

type Nullable<T> = T | null;
