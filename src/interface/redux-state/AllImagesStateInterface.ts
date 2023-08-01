import { ImageInfoInterface } from '../Interfaces';
import { CommonStateInterface } from './CommonStateInterface';

export interface AllImagesStateInterface extends CommonStateInterface {
  images: Array<ImageInfoInterface>;
}
