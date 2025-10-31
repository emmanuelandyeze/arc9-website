import SingleBlogPage from '@/components/SingleBlogPage';

export default function Page({ params }) {
	return <SingleBlogPage slug={params.slug} />;
}
