import { TelegramShareButton, TelegramIcon } from "react-share";

const SharePost = () => {
  const shareUrl = window.location.href;
  const title = "Check this cool post";

  return (
    <div>
      <div className="Demo__some-network">
        <TelegramShareButton
          url={shareUrl}
          title={title}
          className="Demo__some-network__share-button"
        >
          <TelegramIcon size={32} round />
        </TelegramShareButton>
      </div>
    </div>
  );
};

export default SharePost;
