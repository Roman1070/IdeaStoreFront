import { useState } from "react";
import "./ProfileSettingsPage.css";
import { GetCurrentProfile } from "../requests";
import ButtonLight from "../ButtonLight/ButtonLight";
import ProfileSettingsTab from "./ProfileSettingsTab";

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState();
  const [selectedTab, setSelectedTab] = useState(0);
  if (!profile) {
    GetCurrentProfile((currentProfile) => {
      setProfile(currentProfile);
    });
  }
  if (profile && profile.id != -1)
    return (
      <div className="profileSettingsPage">
        <div className="profileSettingsPageMenu">
          <div className="profileSettingsButtonWrapper">
            <ButtonLight isSelected={selectedTab == 0}>
              Изменение профиля
            </ButtonLight>
          </div>
          {/* <div className="profileSettingsButtonWrapper">
            <ButtonLight isSelected={selectedTab == 1}>
              Управление аккаунтом
            </ButtonLight>
          </div> */}
        </div>
        {selectedTab == 0 && <ProfileSettingsTab profile={profile} />}
      </div>
    );
}
