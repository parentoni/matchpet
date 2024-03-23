import { Video } from "../../../../../src/modules/rendering/domain/video";
import { Image } from "../../../../../src/modules/rendering/domain/image";
import { HttpContentManager } from "../../../../../src/modules/rendering/services/implementations/httpContentManager";
import axios from "axios";
import { CommonUseCaseResult } from "../../../../../src/shared/core/response/useCaseError";

const mockedAxiosClient = axios.create();

mockedAxiosClient.get = jest.fn().mockImplementation((src: string)=> {
  console.log(src)
  if (src === 'image') {
    return {
      headers: {
        'content-type': 'image/png'
      },
      data: 'imageData'
    }
  }

  if (src === 'video') {
    return {
      headers: {
        'content-type': 'video/mp4'
      },
      data: 'videoData'
    }
  }

  if (src === 'unsupported') {
    return {
      headers: {
        'content-type': 'unsupported'
      },
      data: 'unsupportedData'
    }
  }

  throw new Error('Invalid src');
})

// defines mocked httpContentManager
const httpContentManager = new HttpContentManager(mockedAxiosClient);

describe('HttpContentManager', () => {
  it('should download image', async () => {
    const response = await httpContentManager.download({src: 'image'});
    expect(response.isRight()).toBeTruthy();
    if (response.isLeft()) return;
    expect(response.value).toBeInstanceOf(Image);
  })

  it('should download video', async () => {
    const response = await httpContentManager.download({src: 'video'});
    expect(response.isRight()).toBeTruthy();
    if (response.isLeft()) return;
    expect(response.value).toBeInstanceOf(Video);
  })

  it('should return invalid value', async () => {
    const response = await httpContentManager.download({src: 'unsupported'});
    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(CommonUseCaseResult.InvalidValue);
  })

  it('should return unexpectederror on invalid urls value', async () => {
    const response = await httpContentManager.download({src: '123456789'});
    expect(response.isLeft()).toBeTruthy();
    expect(response.value).toBeInstanceOf(CommonUseCaseResult.UnexpectedError);
  })  
})
