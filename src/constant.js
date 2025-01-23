export const getTimeDifference = (createdAt) => {
    const createdDate = new Date(createdAt);
    const now = new Date();

    const differenceInMilliseconds = now - createdDate;
    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

    if (differenceInDays > 0) {
      return `${differenceInDays} days Ago`;
    } else if(differenceInHours>0){
      return `${differenceInHours} hours Ago`;
    }
    else{
      return `${differenceInMinutes} Minutes Ago`;
    }
  };