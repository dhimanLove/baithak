"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Checkbox } from "@/components/ui/Checkbox";
import { firstName, formatDate } from "@/lib/format";
import type { ActionItem, Person } from "@/lib/types";

function ActionItemRow({
  item,
  owner,
  onToggle,
}: {
  item: ActionItem;
  owner: Person;
  onToggle: (id: string) => void;
}) {
  return (
    <li className="-mx-2 flex items-start gap-2 rounded-[8px] px-2 py-3 transition-colors duration-200 hover:bg-paper">
      <Checkbox
        id={`action-${item.id}`}
        checked={item.done}
        onChange={() => onToggle(item.id)}
      />

      <div className="min-w-0 flex-1">
        <label htmlFor={`action-${item.id}`} className="block cursor-pointer">
          <span
            className={`t-body block transition-colors duration-200 ${
              item.done ? "text-slate line-through decoration-1" : ""
            }`}
          >
            {item.text}
          </span>
        </label>

        <p className="t-small mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-slate">
          <Avatar name={owner.name} className="h-5 w-5 text-[9px]" />
          <span>{firstName(owner.name)}</span>
          <span aria-hidden="true">·</span>
          <span>Due {formatDate(item.due)}</span>
        </p>
      </div>
    </li>
  );
}

export function ActionItems({
  items,
  people,
}: {
  items: ActionItem[];
  people: Person[];
}) {
  const [state, setState] = useState<ActionItem[]>(items);
  const done = state.filter((item) => item.done).length;

  function toggle(id: string) {
    setState((current) =>
      current.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    );
  }

  return (
    <section aria-labelledby="actions-heading" className="card-linen">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="actions-heading" className="t-heading-sm">
          Action items
        </h2>
        <p className="tag tag-outline">
          {done} of {state.length} done
        </p>
      </div>

      <hr className="hairline mt-5" />

      <ul className="mt-3 flex flex-col gap-1">
        {state.map((item) => {
          const owner =
            people.find((person) => person.id === item.ownerId) ??
            ({ id: item.ownerId, name: "Unassigned" } as Person);

          return (
            <ActionItemRow
              key={item.id}
              item={item}
              owner={owner}
              onToggle={toggle}
            />
          );
        })}
      </ul>
    </section>
  );
}
