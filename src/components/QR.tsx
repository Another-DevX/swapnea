import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

const QR = () => {
  const [scanResult, setscanResult] = useState();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        qrbox: {
          width: 250,
          height: 250,
        },
        fps: 5,
      },
      false
    );
    scanner.render(success, error);

    function success(result: any) {
      scanner.clear();
      setscanResult(result);
    }

    function error(err: any) {
      console.warn(err);
    }
  }, []);

  return (
    <div>
      {scanResult ? <div>Success</div> : <div id="reader" />}
    </div>
  );
};

export default QR
