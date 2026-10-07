# Filmcosmos

React frontend for browsing and filtering movies and TV series by IMDb rating (mock data).

## Run locally

```bash
cd /Users/vivekanand/FC
npm install
npm run dev
```

Open the URL shown in the terminal (usually **http://localhost:5173**).

## Pages

1. **Home** (`/`) — carousel, Movies/TV toggle, filter bar opens the filter modal.
2. **Filters** (modal) — choose rating, actor, genre, year; **Apply** navigates to results.
3. **Results** (`/results`) — filter chips, search, sort, movie list (mock catalog).

## Build

```bash
npm run build
npm run preview
```
