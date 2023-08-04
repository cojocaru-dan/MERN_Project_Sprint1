export default function PopupMessage({ stars }) {
  return (
    <>
    {stars > 0 ? (<h2>Your rating has been registered!</h2>) 
               : (<h2>You haven't rated the movie yet!</h2>)}
    </>
  );
}
