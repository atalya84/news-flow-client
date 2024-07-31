import { ClimbingBoxLoader } from "react-spinners";
import './LoadingPage.css'

export const LoadingPage = () => {
    return (
        <div className='page-loading-animation'>
            <ClimbingBoxLoader color="#b9b0a4" size={35} />
        </div>
    );
  };