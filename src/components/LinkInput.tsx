'use client';

import { useRef, type FC } from 'react';
import type { Link } from '@prisma/client';
import type { Identifier, XYCoord } from 'dnd-core';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';

import PlatformSelect from '@/components/PlatformSelect';
import { Icons } from '@/components/Icons';
import { Controller } from 'react-hook-form';
import { useDrop, useDrag } from 'react-dnd';

interface LinkInputProps {
  link: Link;
  index: number;
  //   TODO Type this
  register: any;
  error: string;
  remove: any;
  control: any;
  move: (dragIndex: number, hoverIndex: number) => void;
}

interface DragItem {
  index: number;
  id: string;
  type: string;
}

const LinkInput: FC<LinkInputProps> = ({
  link,
  index,
  register,
  error,
  remove,
  control,
  move,
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: 'link',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      move(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'link',
    item: () => {
      return { id: link.id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className="p-5 rounded-xl bg-background dark:bg-slate-800 text-gray-500 dark:text-slate-200"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icons.drag />
          <h2 className="flex-1 text-heading-sm">Link #{index + 1}</h2>
        </div>
        <button
          type="button"
          className="text-body-md"
          onClick={() => remove(index)}
        >
          Remove
        </button>
      </div>
      <Label htmlFor="firstName">Platform</Label>

      <Controller
        name={`links.${index}.platform`}
        control={control}
        render={({ field }) => (
          <PlatformSelect value={field.value} onValueChange={field.onChange} />
        )}
      />

      <Label htmlFor="link">Link</Label>
      <Input
        icon="link"
        type="text"
        id="link"
        error={error}
        {...register(`links.${index}.url`)}
        placeholder="e.g. https://www.github.com/johnappleseed"
      />
    </div>
  );
};

export default LinkInput;
