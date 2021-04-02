import { Context } from "./../../context";
import {
    Arg,
    Authorized,
    Subscription,
    Resolver,
    Query,
    Mutation,
    PubSub,
    Root,
    ResolverFilterData,
    Publisher,
    Ctx,
} from "type-graphql";
import { Project, ProjectModel } from "../../entities/project.entity";
import { SubscribeProjectInput } from "./input/subscribeProject.input";

@Resolver()
export class GetProjectResolver {
    @Query(() => Project)
    async getProjectById(@Arg("id") id: String) {
        let project = await ProjectModel.findById(id).exec();

        if (!project) throw new Error(`Project with id: ${id} does not exist`);

        return project;
    }

    @Subscription(() => Project, {
        topics: "PROJECTS",
        filter: ({ payload, args }: any) => {
            return payload._id == args._id;
        },
    })
    // @Authorized()
    subscribeProjectById(
        @Root() project: Project,
        @Arg("_id") projectId: String
        // @Ctx() context: Context
    ) {
        return project;
    }
}
