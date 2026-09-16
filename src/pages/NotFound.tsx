import { primaryCta } from '@/data/site';
import { useSeo } from '@/lib/seo';
import { PageHeader } from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  useSeo({
    title: 'Page not found',
    description: 'The page you were looking for is not available.',
    path: '/404',
    noIndex: true,
  });

  return (
    <>
      <PageHeader
        eyebrow="404"
        title="This page is not available."
        lede="The link may be out of date. The workshop recordings and the pulmonology pages are all reachable from the links below."
      />

      <div className="container-x py-section-sm">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button to="/" variant="primary" size="md" withArrow>
            Go to the workshop page
          </Button>
          <Button to={primaryCta.href} variant="outline" size="md">
            {primaryCta.label}
          </Button>
        </div>
      </div>
    </>
  );
}
