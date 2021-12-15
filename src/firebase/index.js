import axios from "axios";

export const pushNotifications = async () => {
  const data = {
    registration_ids: [
      "eYbdWnPCSnC6ggtYZ5qeBN:APA91bFCbQBhEsXrMjeWLbVRPB4iUyWcQxD1fEdcY84RhsQ_O70EerXm4yh9wkxa2roZ_3YV2khU8d1-_7xXjNE9I7yvB9A1s1ADDhRKoO0W-D2dZ4DkYxQyEdRCE9oEMJArVteJxv1I",
    ],
    notification: {
      title: "Notification",
      body: "Halo Antoni",
      mutable_content: false,
      sound: "Tri-tone",
      icon: "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
    },
    data: {
      url: "https://www.gstatic.com/mobilesdk/160503_mobilesdk/logo/2x/firebase_28dp.png",
      dl: "dev.atmaer",
    },
  };

  await axios({
    method: "post",
    url: "https://fcm.googleapis.com/fcm/send",
    data: data,
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "key=AAAA-mUVSrc:APA91bG-haEQa5GaVlgf5Rm0mBnOr5bFScVqD33SjbtLXpv7PyJbqyzWTeEhDYcVRuBgdERoUg-rEJQTCqk4P074MORE4ZBXaLehnFnzratclEQoJM18ETCTK3MAmVQpbdqurUvO11xy",
    },
  })
    .then(() => console.log("success"))
    .catch(() => console.log("err"));
};
