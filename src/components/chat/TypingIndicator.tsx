export function TypingIndicator() {
  return (
    <div className="flex items-center gap-1">
      <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce" />
      <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce delay-100" />
      <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce delay-200" />
    </div>
  );
}
