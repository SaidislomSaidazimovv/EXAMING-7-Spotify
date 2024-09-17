import React, { useState } from "react";
import { Button, Tooltip, Avatar } from "antd";
import { UserAddOutlined, CloseOutlined } from "@ant-design/icons";
import UserInfo from "../../assets/images/User.png";

function RightSideBar() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <aside className="col-span-2 h-screen overflow-y-auto px-6 py-8 bg-black">
      <header className="flex items-center justify-between mb-10">
        <h1 className="text-white text-xl font-bold tracking-wide">
          Friend Activity
        </h1>
        <div className="flex items-center gap-4">
          <Tooltip title="Add Friend">
            <Button
              shape="circle"
              icon={<UserAddOutlined />}
              className="text-white bg-primary-5 hover:bg-primary-6"
            />
          </Tooltip>
          <Tooltip title="Close Sidebar">
            <Button
              shape="circle"
              icon={<CloseOutlined />}
              className="text-white bg-gray-700 hover:bg-gray-800"
              onClick={() => setIsVisible(false)} // Close the sidebar
            />
          </Tooltip>
        </div>
      </header>

      <p className="text-white font-medium text-base leading-6 mb-6">
        Let friends and followers on Spotify see what you’re listening to.
      </p>

      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center space-x-4">
          <Avatar size={64} src={UserInfo} />
          <div className="text-white">
            <p className="font-semibold text-lg">User 1</p>
            <p className="text-gray-400 text-sm">Listening to Music</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar size={64} src={UserInfo} />
          <div className="text-white">
            <p className="font-semibold text-lg">User 2</p>
            <p className="text-gray-400 text-sm">Listening to Podcast</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Avatar size={64} src={UserInfo} />
          <div className="text-white">
            <p className="font-semibold text-lg">User 3</p>
            <p className="text-gray-400 text-sm">Listening to Audiobook</p>
          </div>
        </div>
      </div>

      <p className="text-white w-full text-base font-medium mb-5">
        Go to Settings → Social and enable “Share my listening activity on
        Spotify.” You can turn this off at any time.
      </p>

      <Button
        type="primary"
        size="large"
        block
        className="uppercase tracking-wider bg-primary-5 hover:bg-primary-6"
        onClick={() => console.log("Go to Settings")}
      >
        Go to Settings
      </Button>
    </aside>
  );
}

export default RightSideBar;
