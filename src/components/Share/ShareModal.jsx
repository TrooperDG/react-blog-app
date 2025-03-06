import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  RedditShareButton,
  LinkedinShareButton,
  EmailShareButton,
  PinterestShareButton,
} from "react-share";
import {
  FaFacebook,
  FaWhatsapp,
  FaTelegramPlane,
  FaReddit,
  FaLinkedin,
  FaEnvelope,
  FaPinterest,
  FaLink,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaShareAlt,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

function ShareModal({ url, title, onCLose }) {
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const scrollRef = useRef(null);

  function handleCopy() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 4000);
  }

  function scrollLeft() {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }
  function scrollRight() {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
    }
  }

  async function handleWebShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: "Check this out!",
          url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Your browser does not support Web Share API.");
    }
  }

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-20">
      <motion.div
        initial={
          isMobile ? { y: "100%", opacity: 0 } : { scale: 0.95, opacity: 0 }
        }
        animate={isMobile ? { y: "0%", opacity: 1 } : { scale: 1, opacity: 1 }}
        exit={
          isMobile ? { y: "100%", opacity: 0 } : { scale: 0.95, opacity: 0 }
        }
        transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
        className={`bg-white max-w-md p-6 w-full shadow-lg ${
          isMobile ? "fixed  bottom-0 rounded-t-lg" : "rounded-lg "
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h2 className="text-lg font-semibold">Share</h2>
          <button onClick={onCLose}>
            <FaTimes className="text-gray-600 hover:text-gray-800" size={20} />
          </button>
        </div>

        {/* Scrollable Share Icons */}
        <div className="relative flex items-center my-4 ">
          <button
            className="absolute left-0 mb-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 shadow-md p-2 rounded-full -ml-4 z-10"
            onClick={scrollLeft}
          >
            <FaChevronLeft size={14} />
          </button>
          <button
            className="absolute right-0 mb-2 bg-gray-100 hover:bg-gray-200 active:bg-gray-300  shadow-md p-2 rounded-full -mr-4 z-10"
            onClick={scrollRight}
          >
            <FaChevronRight size={14} />
          </button>

          <div
            ref={scrollRef}
            className="flex space-x-6 overflow-auto scroll-smooth scrollbar-hide w-[85%] mx-auto py-3 px-2"
            style={{ scrollBehavior: "smooth" }}
          >
            <FacebookShareButton url={url} quote={title}>
              <FaFacebook
                size={40}
                className="text-blue-600  duration-100 hover:scale-125"
              />
            </FacebookShareButton>

            <TwitterShareButton url={url} title={title}>
              <FaXTwitter
                size={40}
                className="text-black duration-100 hover:scale-125"
              />
            </TwitterShareButton>

            <WhatsappShareButton url={url} title={title}>
              <FaWhatsapp
                size={40}
                className="text-green-500 duration-100 hover:scale-125"
              />
            </WhatsappShareButton>

            <TelegramShareButton url={url} title={title}>
              <FaTelegramPlane
                size={40}
                className="text-blue-500 duration-100 hover:scale-125"
              />
            </TelegramShareButton>

            <RedditShareButton url={url} title={title}>
              <FaReddit
                size={40}
                className="text-red-600 duration-100 hover:scale-125"
              />
            </RedditShareButton>

            <LinkedinShareButton url={url} title={title}>
              <FaLinkedin
                size={40}
                className="text-blue-500 duration-100 hover:scale-125"
              />
            </LinkedinShareButton>

            <EmailShareButton url={url} subject={title} body={url}>
              <FaEnvelope
                size={40}
                className="text-gray-600 duration-100 hover:scale-125"
              />
            </EmailShareButton>

            <PinterestShareButton url={url} media={url} description={title}>
              <FaPinterest
                size={40}
                className="text-red-500 duration-100 hover:scale-125"
              />
            </PinterestShareButton>
          </div>
        </div>

        {/* Copy Link Button */}
        <div
          className="flex items-center border p-2 rounded-lg cursor-pointer bg-gray-100 hover:bg-gray-200"
          onClick={handleCopy}
        >
          <FaLink size={20} className="text-gray-600 mr-2" />
          <span className="flex-1 truncate">{url}</span>
          {copied ? (
            <span className="text-green-500">Copied!</span>
          ) : (
            <span className="text-gray-500">Copy</span>
          )}
        </div>
        {/* Web Share API Button (For Mobile) */}
        {isMobile && navigator.share && (
          <button
            className="mt-4 w-full flex justify-center items-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={handleWebShare}
          >
            Share on Device <FaShareAlt size={20} className="mr-2 ml-2" />
          </button>
        )}
      </motion.div>
    </div>
  );
}

export default ShareModal;
