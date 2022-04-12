import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class RegisterOutput {
    @Field({ nullable: true })
    username?: string;

    @Field({ nullable: true })
    error?: string;
}
