import { useEffect, useState } from "react";

function TwitterPost({ link }: { link: string }) {
  const [embedHtml, setEmbedHtml] = useState("");

  useEffect(() => {
    const fetchEmbed = async () => {
      const response = await fetch(
        `https://publish.twitter.com/oembed?url=${link.replace("x.com", "twitter.com")}&omit_script=true`
      );
      const data = await response.json();
      setEmbedHtml(data.html);
    };

    fetchEmbed();
  }, [link]);

  return <div dangerouslySetInnerHTML={{ __html: embedHtml }} />;
}

export default TwitterPost;
