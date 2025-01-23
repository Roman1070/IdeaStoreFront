import { useState } from "react";
import "./ProfileSettingsPage.css";
import { GetCurrentProfile } from "../requests";
import ButtonLight from "../ButtonLight/ButtonLight";
import ProfileSettingsTab from "./ProfileSettingsTab";

export default function ProfileSettingsPage() {
  const [profile, setProfile] = useState();
  const [selectedTab, setSelectedTab] = useState(0);
  if (!profile) {
    GetCurrentProfile((profileJson) => {
      setProfile(profileJson);
      console.log(profileJson);
    });
  }
  if (profile)
    return (
      <div className="profileSettingsPage">
        <div className="profileSettingsPageMenu">
          <ButtonLight isSelected={selectedTab == 0}>
            Изменение профиля
          </ButtonLight>
          <ButtonLight isSelected={selectedTab == 1}>
            Управление аккаунтом
          </ButtonLight>
        </div>
        {selectedTab == 0 && <ProfileSettingsTab profile={profile} />}
      </div>
    );
}
