import type {
  SubscriptionComparisonColumn,
  SubscriptionComparisonContent,
  SubscriptionComparisonRow,
  SubscriptionTierId,
} from '~/lib/subscription/types';

type SubscriptionComparisonProps = {
  comparison: SubscriptionComparisonContent;
};

function ComparisonCellValue({
  tierId,
  value,
}: {
  tierId: SubscriptionTierId;
  value: string | boolean;
}) {
  const emphasized = tierId === 'enthusiast';

  if (typeof value === 'boolean') {
    if (!value) {
      return (
        <span
          className="font-body text-body-md text-ink-subtle/30"
          aria-label="Not included"
        >
          —
        </span>
      );
    }

    return (
      <span
        aria-hidden
        className="material-symbols-outlined text-roasted-clay"
        style={{fontVariationSettings: "'FILL' 1, 'wght' 300"}}
      >
        check_circle
      </span>
    );
  }

  return (
    <span
      className={`font-body text-body-md ${
        emphasized ? 'font-medium text-espresso' : 'text-ink-subtle'
      }`}
    >
      {value}
    </span>
  );
}

function ComparisonHeaderCell({column}: {column: SubscriptionComparisonColumn}) {
  const featured = column.id === 'enthusiast';

  return (
    <div
      className={
        featured
          ? 'ee-subscription-compare__head-cell ee-subscription-compare__head-cell--featured'
          : 'ee-subscription-compare__head-cell'
      }
    >
      {featured ? <span className="ee-subscription-compare__featured-bar" aria-hidden /> : null}
      <span
        className={`mb-1 block font-label text-[10px] uppercase tracking-[0.2em] ${
          featured ? 'text-roasted-clay' : 'text-ink-subtle'
        }`}
      >
        {column.tierLabel}
      </span>
      <h3 className="font-display text-xl text-espresso">{column.name}</h3>
      {column.editorsChoice ? (
        <span className="ee-subscription-compare__editors-choice sr-only">
          {column.editorsChoice}
        </span>
      ) : null}
    </div>
  );
}

function ComparisonMobile({
  columns,
  rows,
}: {
  columns: SubscriptionComparisonColumn[];
  rows: SubscriptionComparisonRow[];
}) {
  return (
    <div className="ee-subscription-compare__mobile">
      {rows.map((row) => (
        <article key={row.label} className="ee-subscription-compare__mobile-card">
          <h3 className="ee-subscription-compare__mobile-feature">{row.label}</h3>
          <ul className="ee-subscription-compare__mobile-list">
            {columns.map((column) => {
              const featured = column.id === 'enthusiast';
              return (
                <li
                  key={column.id}
                  className={
                    featured
                      ? 'ee-subscription-compare__mobile-item ee-subscription-compare__mobile-item--featured'
                      : 'ee-subscription-compare__mobile-item'
                  }
                >
                  <div className="ee-subscription-compare__mobile-tier">
                    <span
                      className={`font-label text-[10px] uppercase tracking-[0.2em] ${
                        featured ? 'text-roasted-clay' : 'text-ink-subtle'
                      }`}
                    >
                      {column.tierLabel}
                    </span>
                    <span className="font-display text-lg text-espresso">{column.name}</span>
                  </div>
                  <ComparisonCellValue tierId={column.id} value={row.values[column.id]} />
                </li>
              );
            })}
          </ul>
        </article>
      ))}
    </div>
  );
}

function ComparisonDesktop({comparison}: {comparison: SubscriptionComparisonContent}) {
  return (
    <div className="ee-subscription-compare__scroll">
      <div className="ee-subscription-compare__table">
        <div className="ee-subscription-compare__header">
          <div className="ee-subscription-compare__corner" aria-hidden />
          {comparison.columns.map((column) => (
            <ComparisonHeaderCell key={column.id} column={column} />
          ))}
        </div>

        <div className="ee-subscription-compare__body">
          {comparison.rows.map((row, index) => {
            const isLast = index === comparison.rows.length - 1;
            return (
              <div
                key={row.label}
                className={
                  isLast
                    ? 'ee-subscription-compare__data-row ee-subscription-compare__data-row--last'
                    : 'ee-subscription-compare__data-row'
                }
              >
                <div className="ee-subscription-compare__label-cell">
                  <span>{row.label}</span>
                </div>
                {comparison.columns.map((column) => {
                  const featured = column.id === 'enthusiast';
                  return (
                    <div
                      key={column.id}
                      className={
                        featured
                          ? 'ee-subscription-compare__cell ee-subscription-compare__cell--featured'
                          : 'ee-subscription-compare__cell'
                      }
                    >
                      <ComparisonCellValue
                        tierId={column.id}
                        value={row.values[column.id]}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function SubscriptionComparison({comparison}: SubscriptionComparisonProps) {
  return (
    <section className="section ee-subscription__comparison-section">
      <h2 className="ee-subscription-compare__title">{comparison.title}</h2>
      <ComparisonMobile columns={comparison.columns} rows={comparison.rows} />
      <ComparisonDesktop comparison={comparison} />
    </section>
  );
}
