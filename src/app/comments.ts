export class comments{
  _idOfWorkout: number;
  comments: listOfComments[];
}

export class listOfComments{
  comments: string;
  rating: number;
  username: string;
  userProfilePicture: string;
}
