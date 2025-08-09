import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase, type NewsRecord } from "@/lib/supabase";

const newsSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  category: z.string().optional(),
  status: z.enum(["draft","published"]).default("draft"),
  published_at: z.string().nullable().optional(),
  tags: z.string().optional(), // comma-separated in UI
  cover_url: z.string().url().optional().or(z.literal("")).optional(),
});

type NewsFormValues = z.infer<typeof newsSchema>;

const NewsForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;
  const [uploading, setUploading] = useState(false);

  const form = useForm<NewsFormValues>({
    resolver: zodResolver(newsSchema),
    defaultValues: { status: "draft" },
  });

  useEffect(() => {
    const load = async () => {
      if (!isEdit) return;
      const { data, error } = await supabase.from("news").select("*").eq("id", id!).single();
      if (!error && data) {
        const n = data as NewsRecord;
        form.reset({
          title: n.title,
          slug: n.slug,
          excerpt: n.excerpt || "",
          content: n.content || "",
          category: n.category || "",
          status: (n.status as any) || "draft",
          published_at: n.published_at || "",
          tags: (n.tags || []).join(", "),
          cover_url: n.cover_url || "",
        });
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = async (values: NewsFormValues) => {
    const payload: Partial<NewsRecord> = {
      title: values.title,
      slug: values.slug,
      excerpt: values.excerpt,
      content: values.content,
      category: values.category,
      status: values.status as any,
      published_at: values.status === "published" ? (values.published_at || new Date().toISOString()) : null,
      tags: values.tags ? values.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      cover_url: values.cover_url || null,
    };

    const { error } = isEdit
      ? await supabase.from("news").update(payload).eq("id", id!)
      : await supabase.from("news").insert(payload as any);

    if (!error) navigate("/admin/news", { replace: true });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("news-images").upload(path, file, { upsert: false });
    if (!error) {
      const { data } = supabase.storage.from("news-images").getPublicUrl(path);
      form.setValue("cover_url", data.publicUrl, { shouldDirty: true });
    }
    setUploading(false);
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? "Edit" : "New"} Article</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField name="title" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl><Input placeholder="Article title" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField name="slug" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl><Input placeholder="unique-article-slug" {...field} /></FormControl>
                <FormDescription>Used in URLs; must be unique</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField name="excerpt" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl><Textarea rows={3} placeholder="Short summary" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField name="content" control={form.control} render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl><Textarea rows={8} placeholder="Full article content" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField name="category" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl><Input placeholder="e.g., Supreme Court" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="status" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="published_at" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Publish date</FormLabel>
                <FormControl><Input type="datetime-local" value={field.value ?? ""} onChange={field.onChange} /></FormControl>
                <FormDescription>Auto-set when publishing if empty</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField name="tags" control={form.control} render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Tags</FormLabel>
                <FormControl><Input placeholder="comma,separated,tags" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField name="cover_url" control={form.control} render={({ field }) => (
              <FormItem>
                <FormLabel>Cover image</FormLabel>
                <FormControl><Input placeholder="https://..." {...field} /></FormControl>
                <FormDescription>Or upload a file below</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <div className="flex items-center gap-3">
            <Input type="file" accept="image/*" onChange={handleFileChange} />
            {uploading && <span className="text-sm text-muted-foreground">Uploading...</span>}
          </div>

          <div className="flex gap-3">
            <Button type="submit">Save</Button>
            <Button variant="outline" type="button" onClick={() => navigate(-1)}>Cancel</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default NewsForm;
