/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState } from "react"

import { useEpisodeState } from "../../context/EpisodeProvider"
import { useAudioDispatch } from "../../context/AudioProvider"

import { Box, Flex, Text, Heading } from "ui"
import Settings from "./Settings"
import AudioRange from "./AudioRange"
import Time from "./Time"

import GearIcon from "../../images/gear.svg"
import PlayIcon from "../../images/play.svg"
import PauseIcon from "../../images/pause.svg"

const audioPlayer = {
  display: "grid",
  gridTemplateRows: [".75rem auto", ".75rem auto", "auto .75rem"],
  gridTemplateAreas: [
    `"range"
    "settings"`,
    `"range"
    "settings"`,
    `"settings"
    "range"`,
  ],
  bg: "background",
}
const audioPlayerContent = {
  height: "100%",
  gridArea: "settings",
  display: "grid",
  alignItems: "start",
  gridTemplateColumns: "auto 1fr auto",
  gridTemplateAreas: `"play content settings"`,
}
const audioPlayerSettings = {
  gridArea: [
    "1 / play-start / 2 / content-end",
    "1 / play-start / 2 / content-end",
    "1 / play-start / 2 / content-end",
    "1 / play-start / 2 / content-end",
    "settings",
  ],
  bg: "background",
  height: "100%",
}
const audioIconContainer = {
  height: "100%",
  p: ".25rem",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}
const audioPlayIcon = {
  ...audioIconContainer,
  gridArea: "play",
  borderLeft: theme => [
    "none",
    "none",
    `1px solid ${theme.colors.backgroundSubtle}`,
  ],
  borderRight: theme => `1px solid ${theme.colors.backgroundSubtle}`,
}
const audioSettingsIcon = {
  ...audioIconContainer,
  gridArea: "settings",
  display: ["flex", "flex", "flex", "flex", "none"],
  borderLeft: theme => `1px solid ${theme.colors.backgroundSubtle}`,
}
const audioIcon = {
  fontSize: 4,
  py: ".25rem",
  textAlign: "center",
  fill: "text",
  transition: "color .2s",
  "&:hover": {
    fill: "contrast",
  },
}
const episodeTitle = {
  fontSize: 4,
  fontWeight: "normal",
  p: ".5rem",
  height: "100%",
  gridArea: "content",
  display: "flex",
  alignItems: "center",
}

const AudioPlayer = ({ latestEpisode, ...props }) => {
  const [visible, setVisible] = useState(false)
  const episode = useEpisodeState()
  const { play, pause, isPlaying } = useAudioDispatch()
  const handlePlayState = () => {
    if (!visible) isPlaying ? pause() : play()
  }
  return (
    <Box sx={audioPlayer} {...props}>
      <AudioRange
        sx={{ gridArea: "range" }}
        episodeNumber={episode.frontmatter.number}
      />
      <Box sx={audioPlayerContent}>
        <Flex sx={audioPlayIcon} onClick={handlePlayState}>
          <Box sx={audioIcon}>
            {isPlaying ? (
              <PauseIcon sx={{ fill: "inherit", width: "100%" }} />
            ) : (
              <PlayIcon sx={{ fill: "inherit", width: "100%" }} />
            )}
          </Box>
          <Time />
        </Flex>
        <Heading as="h5" variant="h5" sx={episodeTitle}>
          Now Playing #{episode.frontmatter.number}: {episode.frontmatter.title}
        </Heading>
        <Box
          sx={{
            ...audioPlayerSettings,
            display: [
              visible ? "block" : "none",
              visible ? "block" : "none",
              visible ? "block" : "none",
              visible ? "block" : "none",
              "block",
            ],
          }}
        >
          <Settings
            download={episode.frontmatter.url}
            notes={episode.fields.slug}
          />
        </Box>
        <Flex sx={audioSettingsIcon} onClick={() => setVisible(!visible)}>
          <Box sx={audioIcon}>
            <GearIcon sx={{ fill: "inherit", width: "100%" }} />
          </Box>
          <Text sx={{ fontSize: ".65rem" }} variant="tabular">
            SETTINGS
          </Text>
        </Flex>
      </Box>
    </Box>
  )
}

export default AudioPlayer
