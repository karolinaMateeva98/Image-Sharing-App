import React from 'react';
import { findByText, fireEvent, render, screen } from '@testing-library/react';
import CollectionsComponent from './page';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import FakeBackendService from '../../service/FakeBackendService';

beforeAll(() => {
  return mockNavigate();
});
const mockNavigate = () => {
  const mockedUsedNavigate = jest.fn();

  jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate
  }));
};

describe('notifyUser', () => {
  it('should notify to customer', () => {
    FakeBackendService.searchImages = jest.fn().mockReturnValue({ email: 'a' });
    //    {
    //      "id":"gKXKBY-C-Dk",
    //      "created_at":"2018-01-02T10:20:47Z",
    //      "updated_at":"2023-03-24T07:02:54Z",
    //      "promoted_at":null,
    //      "width":5026,
    //      "height":3458,
    //      "color":"#598c73",
    //      "blur_hash":"LDCtq6Me0_kp3mof%MofUwkp,cRP",
    //      "description":"Gipsy the Cat was sitting on a bookshelf one afternoon and just stared right at me, kinda saying: “Will you take a picture already?”",
    //      "alt_description":"black and white cat lying on brown bamboo chair inside room",
    //      "urls":{
    //         "raw":"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixid=Mnw0MjQ3NDR8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHx8fHwxNjc5Njc4NDQ5\u0026ixlib=rb-4.0.3",
    //         "full":"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?crop=entropy\u0026cs=srgb\u0026fm=jpg\u0026ixid=Mnw0MjQ3NDR8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHx8fHwxNjc5Njc4NDQ5\u0026ixlib=rb-4.0.3\u0026q=85",
    //         "regular":"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=Mnw0MjQ3NDR8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHx8fHwxNjc5Njc4NDQ5\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=1080",
    //         "small":"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=Mnw0MjQ3NDR8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHx8fHwxNjc5Njc4NDQ5\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=400",
    //         "thumb":"https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?crop=entropy\u0026cs=tinysrgb\u0026fit=max\u0026fm=jpg\u0026ixid=Mnw0MjQ3NDR8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHx8fHwxNjc5Njc4NDQ5\u0026ixlib=rb-4.0.3\u0026q=80\u0026w=200",
    //         "small_s3":"https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1514888286974-6c03e2ca1dba"
    //      },
    //      "links":{
    //         "self":"https://api.unsplash.com/photos/gKXKBY-C-Dk",
    //         "html":"https://unsplash.com/photos/gKXKBY-C-Dk",
    //         "download":"https://unsplash.com/photos/gKXKBY-C-Dk/download?ixid=Mnw0MjQ3NDR8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHx8fHwxNjc5Njc4NDQ5",
    //         "download_location":"https://api.unsplash.com/photos/gKXKBY-C-Dk/download?ixid=Mnw0MjQ3NDR8MHwxfHNlYXJjaHwxfHxjYXR8ZW58MHx8fHwxNjc5Njc4NDQ5"
    //      },
    //      "likes":1273,
    //      "liked_by_user":false,
    //      "current_user_collections":[

    //      ],
    //      "sponsorship":null,
    //      "topic_submissions":{

    //      },
    //      "user":{
    //         "id":"wBu1hC4QlL0",
    //         "updated_at":"2023-03-20T10:03:10Z",
    //         "username":"madhatterzone",
    //         "name":"Manja Vitolic",
    //         "first_name":"Manja",
    //         "last_name":"Vitolic",
    //         "twitter_username":null,
    //         "portfolio_url":"https://www.instagram.com/makawee_photography/?hl=en",
    //         "bio":"https://www.instagram.com/makawee_photography/",
    //         "location":"Wiesbaden, Germany",
    //         "links":{
    //            "self":"https://api.unsplash.com/users/madhatterzone",
    //            "html":"https://unsplash.com/de/@madhatterzone",
    //            "photos":"https://api.unsplash.com/users/madhatterzone/photos",
    //            "likes":"https://api.unsplash.com/users/madhatterzone/likes",
    //            "portfolio":"https://api.unsplash.com/users/madhatterzone/portfolio",
    //            "following":"https://api.unsplash.com/users/madhatterzone/following",
    //            "followers":"https://api.unsplash.com/users/madhatterzone/followers"
    //         },
    //         "profile_image":{
    //            "small":"https://images.unsplash.com/profile-fb-1514888261-0e72294039e0.jpg?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
    //            "medium":"https://images.unsplash.com/profile-fb-1514888261-0e72294039e0.jpg?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
    //            "large":"https://images.unsplash.com/profile-fb-1514888261-0e72294039e0.jpg?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
    //         },
    //         "instagram_username":"makawee_photography",
    //         "total_collections":0,
    //         "total_likes":10,
    //         "total_photos":65,
    //         "accepted_tos":true,
    //         "for_hire":true,
    //         "social":{
    //            "instagram_username":"makawee_photography",
    //            "portfolio_url":"https://www.instagram.com/makawee_photography/?hl=en",
    //            "twitter_username":null,
    //            "paypal_email":null
    //         }
    //      },
    //      "tags":[
    //         {
    //            "type":"landing_page",
    //            "title":"cat",
    //            "source":{
    //               "ancestry":{
    //                  "type":{
    //                     "slug":"images",
    //                     "pretty_slug":"Images"
    //                  },
    //                  "category":{
    //                     "slug":"animals",
    //                     "pretty_slug":"Animals"
    //                  },
    //                  "subcategory":{
    //                     "slug":"cat",
    //                     "pretty_slug":"Cat"
    //                  }
    //               },
    //               "title":"Cat images \u0026 pictures",
    //               "subtitle":"Download free cat images",
    //               "description":"9 lives isn't enough to capture the amazing-ness of cats. You need high-quality, professionally photographed images to do that. Unsplash's collection of cat images capture the wonder of the kitty in high-definition, and you can use these images however you wish for free.",
    //               "meta_title":"20+ Cat Pictures \u0026 Images [HD] | Download Free Images \u0026 Stock Photos on Unsplash",
    //               "meta_description":"Choose from hundreds of free cat pictures. Download HD cat photos for free on Unsplash.",
    //               "cover_photo":{
    //                  "id":"_SMNO4cN9vs",
    //                  "created_at":"2018-12-30T17:17:38Z",
    //                  "updated_at":"2022-12-01T04:27:24Z",
    //                  "promoted_at":"2019-01-01T10:23:58Z",
    //                  "width":4000,
    //                  "height":4000,
    //                  "color":"#0c0c26",
    //                  "blur_hash":"L012.;oL4=WBt6j@Rlay4;ay^iof",
    //                  "description":"Glow in the Dark",
    //                  "alt_description":"yellow eyes",
    //                  "urls":{
    //                     "raw":"https://images.unsplash.com/photo-1546190255-451a91afc548?ixlib=rb-4.0.3",
    //                     "full":"https://images.unsplash.com/photo-1546190255-451a91afc548?ixlib=rb-4.0.3\u0026q=80\u0026cs=tinysrgb\u0026fm=jpg\u0026crop=entropy",
    //                     "regular":"https://images.unsplash.com/photo-1546190255-451a91afc548?ixlib=rb-4.0.3\u0026w=1080\u0026fit=max\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb",
    //                     "small":"https://images.unsplash.com/photo-1546190255-451a91afc548?ixlib=rb-4.0.3\u0026w=400\u0026fit=max\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb",
    //                     "thumb":"https://images.unsplash.com/photo-1546190255-451a91afc548?ixlib=rb-4.0.3\u0026w=200\u0026fit=max\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb",
    //                     "small_s3":"https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1546190255-451a91afc548"
    //                  },
    //                  "links":{
    //                     "self":"https://api.unsplash.com/photos/_SMNO4cN9vs",
    //                     "html":"https://unsplash.com/photos/_SMNO4cN9vs",
    //                     "download":"https://unsplash.com/photos/_SMNO4cN9vs/download",
    //                     "download_location":"https://api.unsplash.com/photos/_SMNO4cN9vs/download"
    //                  },
    //                  "likes":513,
    //                  "liked_by_user":false,
    //                  "current_user_collections":[

    //                  ],
    //                  "sponsorship":null,
    //                  "topic_submissions":{
    //                     "animals":{
    //                        "status":"approved",
    //                        "approved_on":"2020-04-06T14:20:17Z"
    //                     }
    //                  },
    //                  "premium":false,
    //                  "user":{
    //                     "id":"KlbPlQFM3j4",
    //                     "updated_at":"2021-06-29T13:48:33Z",
    //                     "username":"unlesbar_1608112_sink",
    //                     "name":"Stephan Henning",
    //                     "first_name":"Stephan",
    //                     "last_name":"Henning",
    //                     "twitter_username":null,
    //                     "portfolio_url":null,
    //                     "bio":null,
    //                     "location":"Germany",
    //                     "links":{
    //                        "self":"https://api.unsplash.com/users/unlesbar_1608112_sink",
    //                        "html":"https://unsplash.com/pt-br/@unlesbar_1608112_sink",
    //                        "photos":"https://api.unsplash.com/users/unlesbar_1608112_sink/photos",
    //                        "likes":"https://api.unsplash.com/users/unlesbar_1608112_sink/likes",
    //                        "portfolio":"https://api.unsplash.com/users/unlesbar_1608112_sink/portfolio",
    //                        "following":"https://api.unsplash.com/users/unlesbar_1608112_sink/following",
    //                        "followers":"https://api.unsplash.com/users/unlesbar_1608112_sink/followers"
    //                     },
    //                     "profile_image":{
    //                        "small":"https://images.unsplash.com/profile-1531167540173-a920494357e7?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
    //                        "medium":"https://images.unsplash.com/profile-1531167540173-a920494357e7?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
    //                        "large":"https://images.unsplash.com/profile-1531167540173-a920494357e7?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
    //                     },
    //                     "instagram_username":null,
    //                     "total_collections":3,
    //                     "total_likes":67,
    //                     "total_photos":0,
    //                     "accepted_tos":true,
    //                     "for_hire":false,
    //                     "social":{
    //                        "instagram_username":null,
    //                        "portfolio_url":null,
    //                        "twitter_username":null,
    //                        "paypal_email":null
    //                     }
    //                  }
    //               }
    //            }
    //         },
    //         {
    //            "type":"search",
    //            "title":"pet"
    //         },
    //         {
    //            "type":"landing_page",
    //            "title":"animal",
    //            "source":{
    //               "ancestry":{
    //                  "type":{
    //                     "slug":"images",
    //                     "pretty_slug":"Images"
    //                  },
    //                  "category":{
    //                     "slug":"animals",
    //                     "pretty_slug":"Animals"
    //                  }
    //               },
    //               "title":"Animals images \u0026 pictures",
    //               "subtitle":"Download free animals images",
    //               "description":"Passionate photographers have captured the most gorgeous animals in the world in their natural habitats and shared them with Unsplash. Now you can use these photos however you wish, for free!",
    //               "meta_title":"Best 20+ Animals Pictures [HD] | Download Free Images on Unsplash",
    //               "meta_description":"Choose from hundreds of free animals pictures. Download HD animals photos for free on Unsplash.",
    //               "cover_photo":{
    //                  "id":"YozNeHM8MaA",
    //                  "created_at":"2017-04-18T17:00:04Z",
    //                  "updated_at":"2023-03-18T05:01:29Z",
    //                  "promoted_at":"2017-04-19T17:54:55Z",
    //                  "width":5184,
    //                  "height":3456,
    //                  "color":"#f3f3c0",
    //                  "blur_hash":"LPR{0ext~pIU%MRQM{%M%LozIBM|",
    //                  "description":"I met this dude on safari in Kruger National park in northern South Africa. The giraffes were easily in my favorite creatures to witness. They seemed almost prehistoric the the way the graced the African plain.",
    //                  "alt_description":"selective focus photography of giraffe",
    //                  "urls":{
    //                     "raw":"https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-4.0.3",
    //                     "full":"https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-4.0.3\u0026q=80\u0026cs=tinysrgb\u0026fm=jpg\u0026crop=entropy",
    //                     "regular":"https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-4.0.3\u0026w=1080\u0026fit=max\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb",
    //                     "small":"https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-4.0.3\u0026w=400\u0026fit=max\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb",
    //                     "thumb":"https://images.unsplash.com/photo-1492534513006-37715f336a39?ixlib=rb-4.0.3\u0026w=200\u0026fit=max\u0026q=80\u0026fm=jpg\u0026crop=entropy\u0026cs=tinysrgb",
    //                     "small_s3":"https://s3.us-west-2.amazonaws.com/images.unsplash.com/small/photo-1492534513006-37715f336a39"
    //                  },
    //                  "links":{
    //                     "self":"https://api.unsplash.com/photos/YozNeHM8MaA",
    //                     "html":"https://unsplash.com/photos/YozNeHM8MaA",
    //                     "download":"https://unsplash.com/photos/YozNeHM8MaA/download",
    //                     "download_location":"https://api.unsplash.com/photos/YozNeHM8MaA/download"
    //                  },
    //                  "likes":1520,
    //                  "liked_by_user":false,
    //                  "current_user_collections":[

    //                  ],
    //                  "sponsorship":null,
    //                  "topic_submissions":{
    //                     "animals":{
    //                        "status":"approved",
    //                        "approved_on":"2021-06-09T15:10:40Z"
    //                     }
    //                  },
    //                  "premium":false,
    //                  "user":{
    //                     "id":"J6cg9TA8-e8",
    //                     "updated_at":"2023-03-15T15:08:56Z",
    //                     "username":"judahlegge",
    //                     "name":"Judah Legge",
    //                     "first_name":"Judah",
    //                     "last_name":"Legge",
    //                     "twitter_username":null,
    //                     "portfolio_url":null,
    //                     "bio":null,
    //                     "location":null,
    //                     "links":{
    //                        "self":"https://api.unsplash.com/users/judahlegge",
    //                        "html":"https://unsplash.com/@judahlegge",
    //                        "photos":"https://api.unsplash.com/users/judahlegge/photos",
    //                        "likes":"https://api.unsplash.com/users/judahlegge/likes",
    //                        "portfolio":"https://api.unsplash.com/users/judahlegge/portfolio",
    //                        "following":"https://api.unsplash.com/users/judahlegge/following",
    //                        "followers":"https://api.unsplash.com/users/judahlegge/followers"
    //                     },
    //                     "profile_image":{
    //                        "small":"https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=32\u0026h=32",
    //                        "medium":"https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=64\u0026h=64",
    //                        "large":"https://images.unsplash.com/profile-fb-1492532922-001f65e39343.jpg?ixlib=rb-4.0.3\u0026crop=faces\u0026fit=crop\u0026w=128\u0026h=128"
    //                     },
    //                     "instagram_username":"khoziemusic",
    //                     "total_collections":0,
    //                     "total_likes":4,
    //                     "total_photos":1,
    //                     "accepted_tos":false,
    //                     "for_hire":false,
    //                     "social":{
    //                        "instagram_username":"khoziemusic",
    //                        "portfolio_url":null,
    //                        "twitter_username":null,
    //                        "paypal_email":null
    //                     }
    //                  }
    //               }
    //            }
    //         }
    //      ]
    //   },

    // db.getUserEmail = function(userId){
    //  return {email: 'a'};
    //}
    // notification.send = jest.fn();
    // // let notified = false;
    // // notification.send = function(email, message) {
    // //   notified= true;
    // // }
    // data.notifyUser({userId:1});
    // // expect(notified).toBe(true);
    // expect(notification.send).toHaveBeenCalled();
  });
});

describe('CollectionsComponent', () => {
  let getByRole: Function;
  let getByLabelText: Function;

  beforeEach(() => {
    ({ getByRole, getByLabelText } = render(
      <BrowserRouter>
        <CollectionsComponent />
      </BrowserRouter>
    ));
  });

  it('renders the search button', () => {
    const searchButton = getByRole('button', { name: /search/i });
    expect(searchButton).toBeInTheDocument();
  });

  it('renders the collection create part', () => {
    const collectionName = getByLabelText(/collection name/i);
    const collectionDesc = getByLabelText(/description/i);
    const createBtn = getByRole('button', { name: /create/i });

    expect(collectionName).toBeInTheDocument();
    expect(collectionDesc).toBeInTheDocument();
    expect(createBtn).toBeInTheDocument();
  });

  it('has empty input field', () => {
    const collectionName = getByLabelText(/collection name/i);
    const collectionDesc = getByLabelText(/description/i);
    const createBtn = getByRole('button', { name: /create/i });

    expect(collectionName).toBeInTheDocument();
    expect(collectionDesc).toBeInTheDocument();
    expect(createBtn).toBeInTheDocument();

    userEvent.type(collectionName, 'test');
    userEvent.type(collectionDesc, 'test');

    userEvent.clear(collectionName);
    userEvent.clear(collectionDesc);

    expect(collectionName).toHaveValue('');
    expect(collectionDesc).toHaveValue('');
  });
});
