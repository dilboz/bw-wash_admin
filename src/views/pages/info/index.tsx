import React from "react";
import { Page } from "@components";
import { MainLayout } from "@layouts";
import { BaseUrl } from "@utils/BaseUrl";
import { LSTokenName } from "@utils/LocaStorage";
import { toast } from "react-toastify";

export const Info: React.FC = (): JSX.Element => {
  const [email, setEmail] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [about, setAbout] = React.useState<string>("");
  const [instagram, setInstagram] = React.useState<string>("");
  const [facebook, setFacebook] = React.useState<string>("");
  const [telegram, setTelegram] = React.useState<string>("");

  const handleSave = React.useCallback(() => {
    fetch(BaseUrl + "/contacts", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer " + JSON.parse(localStorage.getItem(LSTokenName) || ""),
      },
      body: JSON.stringify({
        email,
        phone,
        about,
        instagram,
        facebook,
        telegram,
      }),
    })
      .then((res) => {
        toast.success("Данные успешно обновлены");
      })
      .catch((err) => {
        toast.error("Ошибка обновления данных");
      });
  }, [about, email, facebook, instagram, phone, telegram]);

  React.useEffect(() => {
    fetch(BaseUrl + "/contacts", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setEmail(data.email);
        setPhone(data.phone);
        setAbout(data.about);
        setInstagram(data.instagram);
        setFacebook(data.facebook);
        setTelegram(data.telegram);
      });
  }, []);

  return (
    <Page title="Контакты">
      <MainLayout>
        <h1 className="title mb-3">Контакты</h1>
        <div className="form characteristics-form">
          <p className="info-p">
            Email:
            <input
              type="text"
              className="info-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>
          <p className="info-p">
            Telegram:
            <input
              type="text"
              className="info-input"
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
            />
          </p>
          <p className="info-p">
            Instagram:
            <input
              type="text"
              className="info-input"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
            />
          </p>
          <p className="info-p">
            Phone:
            <input
              type="text"
              className="info-input"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </p>
          <p className="info-p">
            Facebook:
            <input
              type="text"
              className="info-input"
              value={facebook}
              onChange={(e) => setFacebook(e.target.value)}
            />
          </p>
          <p className="info-p">
            About:
            <textarea
              className="info-text"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </p>
          <button onClick={handleSave}>Сохранить</button>
        </div>
      </MainLayout>
    </Page>
  );
};
