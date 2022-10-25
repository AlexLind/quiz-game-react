import React from "react";
import LoadingButton from "@mui/lab/LoadingButton";



export default function Loading({}) {
  return <div className="app">
      <section className="question-section">
        <LoadingButton size="large" loading loadingIndicator="Loading…" variant="outlined">
          Fetch data
        </LoadingButton>
      </section>
    </div>;
}
  