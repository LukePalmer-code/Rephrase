import { Route, Routes } from "react-router-dom";
import { AppEmptyState } from "./pages/app/AppEmptyState";
import { AppLayout } from "./pages/app/AppLayout";
import { HomePage } from "./pages/app/HomePage";
import { IslandsPage } from "./pages/app/IslandsPage";
import { ListenPage } from "./pages/app/ListenPage";
import { ListenSessionPage } from "./pages/app/ListenSessionPage";
import { MePage } from "./pages/app/MePage";
import { NarratePage } from "./pages/app/NarratePage";
import { RecallPage } from "./pages/app/RecallPage";
import { RecallSessionPage } from "./pages/app/RecallSessionPage";
import { PortfolioPage } from "./pages/PortfolioPage";
import {
  DocumentCheckIcon,
  HeadphonesIcon,
  IslandIcon,
  SparkleIcon,
  UserIcon,
} from "./icons/RephraseIcons";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PortfolioPage />} />

      {/* Demo — the fully populated showcase experience linked from the portfolio site. */}
      <Route path="/demo/listen/session/:playlistId" element={<ListenSessionPage />} />
      <Route path="/demo/recall/session/:setId" element={<RecallSessionPage />} />
      <Route path="/demo" element={<AppLayout basePath="/demo" />}>
        <Route index element={<HomePage />} />
        <Route path="narrate" element={<NarratePage />} />
        <Route path="listen" element={<ListenPage />} />
        <Route path="recall" element={<RecallPage />} />
        <Route path="islands" element={<IslandsPage />} />
        <Route path="me" element={<MePage />} />
      </Route>

      {/* Real app — same shell, empty and ready to be wired up to the real backend. */}
      <Route path="/app" element={<AppLayout basePath="/app" />}>
        <Route
          index
          element={
            <AppEmptyState
              eyebrow="Home"
              title="Nothing narrated yet"
              message="Once you narrate your first moment, your daily tasks and language islands will start appearing here."
              icon={SparkleIcon}
              tone="blush"
              ctaLabel="Start Narrating"
              ctaTo="/app/narrate"
            />
          }
        />
        <Route path="narrate" element={<NarratePage />} />
        <Route
          path="listen"
          element={
            <AppEmptyState
              eyebrow="Listen"
              title="No playlists yet"
              message="Narrate a few sentences and Rephrase will turn them into your first hands-free listening playlist."
              icon={HeadphonesIcon}
              tone="sage"
              ctaLabel="Start Narrating"
              ctaTo="/app/narrate"
            />
          }
        />
        <Route
          path="recall"
          element={
            <AppEmptyState
              eyebrow="Recall"
              title="No practice sets yet"
              message="Once you've narrated some sentences, the ones you find hardest will show up here for active recall practice."
              icon={DocumentCheckIcon}
              tone="butter"
              ctaLabel="Start Narrating"
              ctaTo="/app/narrate"
            />
          }
        />
        <Route
          path="islands"
          element={
            <AppEmptyState
              eyebrow="Your Islands"
              title="No islands yet"
              message="Islands group your sentences by topic automatically as you narrate more about your life."
              icon={IslandIcon}
              tone="sage"
              ctaLabel="Start Narrating"
              ctaTo="/app/narrate"
            />
          }
        />
        <Route
          path="me"
          element={
            <AppEmptyState
              eyebrow="Me"
              title="Your profile is just getting started"
              message="Your stats, streaks and progress will show up here once you begin practising."
              icon={UserIcon}
              tone="blush"
              ctaLabel="Start Narrating"
              ctaTo="/app/narrate"
            />
          }
        />
      </Route>
    </Routes>
  );
}

export default App;

