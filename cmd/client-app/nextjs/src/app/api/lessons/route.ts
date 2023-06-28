import { LessonClient } from "@/clients/Mediatext"
import Lesson from "@/interfaces/Lesson"
import { NextResponse } from "next/server"
import * as grpc from '@grpc/grpc-js';
import { AdapterSession } from "next-auth/adapters";
import { Session, getServerSession } from "next-auth";
import { authOptions, getUserFromSession } from "@/lib/auth/authoptions";
import { authorize } from "@/errors/http/authorize";

let client = new LessonClient(process.env.MEDIATEXT_GRPC_URI ?? "", grpc.credentials.createInsecure())

export async function POST(request: Request) {
    const user = await getUserFromSession(authOptions);
    if (!user) {
        return NextResponse.json(authorize, {status: 401})
    }

    const rawLesson: Lesson = await request.json()
    if (typeof rawLesson.name == "undefined" || typeof rawLesson.slug == "undefined") {
        return NextResponse.json({ "error": "Invalid request" }, { status: 400 })
    }
    console.log(rawLesson, rawLesson.language, rawLesson.name, rawLesson.slug)

    // to overcome linter. It will be reassigned in a catch below
    let grpcErr: grpc.StatusObject = { code: 0, metadata: new grpc.Metadata(), details: "" }

    // todo receive ownerID from auth
    let createResponse = await client.CreateLessonAsync({ 
        name: rawLesson.name, 
        slug: rawLesson.slug, 
        ownerId: user.id,
        description: rawLesson.description,
    })
        .catch((e: grpc.ServiceError) => {
            console.error("catch grpc", e);
            grpcErr = e
        })
    console.log("after resp", createResponse)
    if (!createResponse && grpcErr && grpcErr.code == 6) {
        return NextResponse.json({ "error": "Try another slug (URL)" }, { status: 400 })
    } else if (!createResponse) {
        return NextResponse.json({ "error": "Internal server error" }, { status: 500 })
    }

    return NextResponse.json(createResponse)

}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug') ?? "";

    const lessons = await client.FindLessonsAsync({slug: slug})

    return NextResponse.json(lessons?.items ?? [])
}