# Brandy Playbook Architect

A Next.js + Tailwind CSS MVP for uploading, indexing, and querying business playbooks using Supabase and OpenAI.

## Setup

1. **Clone the repo and install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   Create a `.env.local` file in the project root with:
   ```env
   SUPABASE_URL=your_supabase_url
   SUPABASE_KEY=your_supabase_service_role_key
   OPENAI_API_KEY=your_openai_api_key
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000)

## Supabase Setup

- **Storage:** Create a bucket named `playbooks` (public=false recommended).
- **Tables:**
  - `documents`:
    - `id` (uuid, PK)
    - `user_id` (text)
    - `file_path` (text)
    - `type` (text)
  - `embeddings`:
    - `id` (uuid, PK)
    - `document_id` (uuid, FK)
    - `chunk` (text)
    - `embedding` (vector/float8[])
- **RPC:** Create a function `match_embeddings` for vector similarity search (see [Supabase docs](https://supabase.com/docs/guides/ai/vector).

## Usage

- Visit `/upload` to upload Master & Business PDFs.
- After upload, you'll be redirected to `/project/[id]` to query and view results.

## Tech Stack
- Next.js (TypeScript, App Router)
- Tailwind CSS
- Supabase (Postgres, Storage, RPC)
- OpenAI GPT-4o

---

For questions or help, see the code comments or contact the project maintainer.
