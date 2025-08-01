import { Button, Input } from 'antd';
import React, { useState, useEffect } from 'react';
import styled from "styled-components";

export default function HomePage() {
  const [redirectUrl, setRedirectUrl] = useState("");

  useEffect(() => {}, []);

  const handleFacebookredirect = () => {
    if (!redirectUrl) return;

    if (redirectUrl.startsWith("/")) {
      return window.location.replace(redirectUrl);
    }

    const isFacebookLink = redirectUrl.includes("facebook.com");

    if (isFacebookLink) {
      window.location.href = redirectUrl;
      return;
    }

    const now = new Date().valueOf();
    const win = window;

    win.location.href = redirectUrl;

    const isAndroid = /Android/i.test(navigator.userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isAndroid) {
      setTimeout(() => {
        if (new Date().valueOf() - now > 5500) return;
        win.location.href = "https://play.google.com/store/apps/details?id=com.facebook.katana";
      }, 5000);
    } else if (isIOS) {
      setTimeout(() => {
        if (new Date().valueOf() - now > 5500) return;
        win.location.href = "https://apps.apple.com/app/facebook/id284882215";
      }, 5000);
    }
  };

  return (
    <>
      <WrapperTwo>
        <div>Facebook Test</div>
        <Input 
          placeholder="กรอก URL ที่ต้องการ redirect" 
          value={redirectUrl}
          onChange={(e) => setRedirectUrl(e.target.value)}
          style={{ width: 400, marginTop: 20, marginBottom: 20 }}
        />
        <Button type="primary" onClick={handleFacebookredirect}>
          ทดสอบ Redirect
        </Button>
      </WrapperTwo>
    </>
  );
}

const Wrapper = styled.div`
  padding-top: 50px;
  margin: 0 auto;
  display: grid;
`;

const WrapperTwo = styled.div`
  padding-top: 150px;
  margin: 0 auto;
  display: grid;
  justify-items: center;
`;

const Background = styled.img`
  position: absolute;
  width: 100%;
  top: 0px;
  z-index: -1;
`;
