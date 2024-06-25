import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { AuthService } from "./AuthService";
import { DataStack, ApiStack } from '../../../outputs.json'
import { AWS_REGION } from '../dev_env.json'

const spacesUrl = ApiStack.SpacesApiEndpoint36C4F3B6 + 'spaces';


export class DataService {

    private authService: AuthService;
    private s3Client: S3Client | undefined;
    private awsRegion = AWS_REGION;

    constructor(authService: AuthService) {
        this.authService = authService;
    }
    public async createSpace(name: string, location: string, photo?: File) {
        const space = {} as any;
        space.name = name;
        space.location = location;
        // if (photo) {
        //     const uploadUrl = await this.uploadPublicFile(photo);
        //     space.photoUrl = uploadUrl;
        //     console.log(uploadUrl);
        // }



        const credentials = await this.authService.getTemporaryCredentials();
        console.log(credentials);

        const postResult = await fetch(spacesUrl, {
            method: 'POST',
            body: JSON.stringify(space),
            headers: {
                'Authorization': this.authService.jwtToken!
            }
        });
        const postResultJSON = await postResult.json();
        return postResultJSON.id;
    }

    private async uploadPublicFile(photo: File) {
        const credentials = await this.authService.getTemporaryCredentials();
        if (!this.s3Client) {
            this.s3Client = new S3Client({
                credentials: credentials as any,
                region: this.awsRegion
            })
        }
        const command = new PutObjectCommand({
            Bucket: 'somebucket',
            Key: 'somefile',
            ACL: 'public-read',
            Body: 'somefile'
        })
        await this.s3Client.send(command);
        return `https://${command.input.Bucket}.s3.${this.awsRegion}.amazonaws.com/${command.input.Key}`
    }

    public isAuthorized(){
        return true;
    }
}