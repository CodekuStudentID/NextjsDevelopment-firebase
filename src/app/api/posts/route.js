import { postService } from "../../../../services/posts";

export async function GET() {
  try {
    const posts = await postService.findAll();
    return Response.json(posts, { status: 200 });
  } catch (err) {
    console.error("GET /api/posts error:", err);
    return Response.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { author, title, content } = body;

    if (!author || !title || !content) {
      return Response.json({ message: "Form tidak lengkap" }, { status: 400 });
    }

    const newPosts = await postService.create({ author, title, content });
    return Response.json(newPosts, { status: 201 });
  } catch (err) {
    console.error("POST /api/posts error:", err);
    return Response.json({ message: "Server error", error: err.message }, { status: 500 });
  }
}
