/** @jsx jsx */
import { jsx, Styled } from "theme-ui"
import React, { useState } from "react"
import { Global } from "@emotion/core"
import SimpleBar from "simplebar-react"

import { Box } from "ui"
import globalCSS from "./globalCSS"
import Header from "./Header"
import AudioPlayer from "../../components/AudioPlayer"
import EpisodeListing from "../../components/EpisodeListing"

const siteWrapper = {
  bg: "background",
  maxWidth: "125rem",
  height: "100vh",
  marginRight: "auto",
  display: "grid",
  gridTemplate: [
    "minmax(3.25rem, auto) 1fr auto / auto",
    "minmax(3.25rem, auto) 1fr auto / auto",
    "minmax(5rem, auto) 1fr / 20rem 1fr",
    "minmax(5rem, auto) 1fr / 23rem 1fr",
    "minmax(5rem, auto) 1fr / 26rem 1fr",
    "minmax(5rem, auto) 1fr / 1fr 2fr 1fr",
  ],
  gridTemplateAreas: [
    `"header"
    "content"
    "audioPlayer"`,
    `"header"
    "content"
    "audioPlayer"`,
    `"header audioPlayer"
    "sidebar content"`,
    `"header audioPlayer"
    "sidebar content"`,
    `"header audioPlayer"
    "sidebar content"`,
    `"sidebar audioPlayer headerControls"
    "sidebar content headerContent"`,
  ],
}
const episodesContainer = {
  gridArea: ["content", "content", "sidebar"],
  zIndex: 2,
  bg: "background",
  overflowY: "hidden",
  borderRight: theme => [
    "none",
    "none",
    `1px solid ${theme.colors.backgroundSubtle}`,
  ],
}
const audioPlayer = {
  gridArea: "audioPlayer",
}

const Layout = ({ children, location }) => {
  const [windowHeight, setWindowHeight] = useState({})
  let pageType
  if (location.pathname.substring(1, 9) === "episodes") pageType = "episode"
  else if (location.pathname === "/") pageType = "home"
  const showEpisodeListing = pageType === "home" ? "block" : "none"
  const showEpisodeContent = pageType === "episode" ? "block" : "none"
  const windowHeight = typeof window !== "undefined" && window.height
  React.useEffect(() => {
    if (windowHeight) {
      setWindowHeight({ height: windowHeight })
    }
  }, [windowHeight])
  return (
    <>
      <Global styles={globalCSS} />
      <Styled.root>
        <Box sx={siteWrapper} style={windowHeight}>
          <Header location={location} />
          <Box
            sx={{
              gridArea: "content",
              overflowY: "hidden",
              zIndex: 2,
              bg: "background",
              display: [showEpisodeContent, showEpisodeContent, "block"],
            }}
          >
            {children}
          </Box>
          <Box
            sx={{
              ...episodesContainer,
              display: [showEpisodeListing, showEpisodeListing, "block"],
            }}
          >
            <SimpleBar style={{ height: "100%" }}>
              <EpisodeListing location={location} />
            </SimpleBar>
          </Box>
          <AudioPlayer style={audioPlayer} />
        </Box>
      </Styled.root>
    </>
  )
}

export default Layout
