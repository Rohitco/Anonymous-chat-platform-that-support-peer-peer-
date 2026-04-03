import { FeaturesSectionWithHoverEffects } from "@/components/blocks/feature-section-with-hover-effects";

export function Demo() {
    return (
        <div className="py-20 bg-neutral-50 dark:bg-neutral-950 min-h-screen">
            <div className="max-w-7xl mx-auto px-10 mb-10">
                <h2 className="text-4xl font-bold text-neutral-800 dark:text-neutral-100">
                    Our Special Features
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mt-2">
                    Discover why thousands of developers choose our platform.
                </p>
            </div>
            <FeaturesSectionWithHoverEffects />
        </div>
    );
}

export default Demo;
