import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from '@/proto/generated/mediatext';
import path from 'path';
import { FindMediaReply, FindMediaReply__Output } from '@/proto/generated/FindMediaReply';
import { FindMediaRequest } from '@/proto/generated/FindMediaRequest';
import { promisify } from 'util';
import { CreateLessonRequest } from '@/proto/generated/CreateLessonRequest';
import { CreateLessonReply } from '@/proto/generated/CreateLessonReply';
import { StoreLessonElementRequest } from '@/proto/generated/StoreLessonElementRequest';
import { StoreLessonElementReply } from '@/proto/generated/StoreLessonElementReply';
import { FindElementsReply } from '@/proto/generated/FindElementsReply';
import { FindLessonElementRequest } from '@/proto/generated/FindLessonElementRequest';
import { FindLessonsRequest } from '@/proto/generated/FindLessonsRequest';
import { FindLessonsReply } from '@/proto/generated/FindLessonsReply';
import { CreateMediaReply } from '@/proto/generated/CreateMediaReply';
import { CreateMediaRequest } from '@/proto/generated/CreateMediaRequest';

const PROTO_PATH = path.join(process.cwd(), './src/proto/mediatext.proto');

// suggested options for similarity to loading grpc.load behavior
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: false,
  defaults: true,
  oneofs: true,
});

export const MediaTextClientRaw = (
  grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
).MediaService;
export const LessonClientRaw = (
  grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType
).LessonService;


export class MediaTextClient extends MediaTextClientRaw {
  public async FindMediaAsync(req: FindMediaRequest): Promise<FindMediaReply|undefined> {
    const query = promisify(this.FindMedia).bind(this);
    return await query(req);
  }
  public async CreateMediaAsync(req: CreateMediaRequest): Promise<CreateMediaReply|undefined> {
    const query = promisify(this.CreateMedia).bind(this);
    return await query(req);
  }
}

export class LessonClient extends LessonClientRaw {
  public async CreateLessonAsync(req: CreateLessonRequest): Promise<CreateLessonReply|undefined> {
    const query = promisify(this.CreateLesson).bind(this);
    return await query(req);
  }
  public async StoreElementAsync(req: StoreLessonElementRequest): Promise<StoreLessonElementReply|undefined> {
    const query = promisify(this.StoreElement).bind(this);
    return await query(req);
  }
  public async FindElementsAsync(req: FindLessonElementRequest): Promise<FindElementsReply|undefined> {
    const query = promisify(this.FindElements).bind(this);
    return await query(req);
  }
  public async FindLessonsAsync(req: FindLessonsRequest): Promise<FindLessonsReply|undefined> {
    const query = promisify(this.FindLessons).bind(this);
    return await query(req);
  }
}
