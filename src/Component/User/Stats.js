import React, { useEffect} from "react";
import "material-icons/iconfont/material-icons.css";
import { useDispatch, useSelector } from "react-redux";
import { UserStats } from "../../Redux/Features/user/userSlice";

const Stats = () => {
  const dispatch = useDispatch();
  const stats = useSelector((state) => state.user.stats);
  const status = useSelector((state) => state.user.statsStatus);
  const error = useSelector((state) => state.user.statsError);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(UserStats()); // Dispatch the action to fetch stats
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading stats...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  if (!stats) {
    return null; // Or handle the case where stats are not available
  }

  return (
    <>
      <div className="text-gray-400 mt-4 flex ">
        <div className="flex">
          <div className="flex mx-2">
            <div>{stats.totalVideos}</div>
            <div className="material-icons ">smart_display</div>
          </div>
          <div className="flex mx-2">
            <div>{stats.totalLikes}</div>
            <div className="material-icons ">favorite</div>
          </div>
        </div>
        <div className="flex">
          <div className="flex mx-2">
            <div>{stats.totalSubscribers}</div>
            <div className="font-bold mx-[3px]">Subscriber</div>
          </div>
          <div className="flex mx-2">
            <div>{stats.totalViews}</div>
            <div className="font-bold mx-[3px]">Views</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stats;
