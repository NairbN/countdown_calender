"use client";

import {
  Badge,
  Banner,
  Button,
  Card,
  Chip,
  EmptyState,
  FormField,
  Grid,
  Heading,
  Input,
  Modal,
  PageShell,
  SegmentedControl,
  Skeleton,
  Spinner,
  Stack,
  Surface,
  Text,
  Toolbar,
  Toggle,
  tokens,
} from "@countdown-calender/ui";
import { useState } from "react";

export default function UIPlaygroundPage() {
  const [seg, setSeg] = useState<"all" | "upcoming">("all");
  const [toggle, setToggle] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <PageShell
      title="UI Playground"
      subtitle="Preview shared UI primitives"
      actions={<Button onClick={() => setModalOpen(true)}>Open modal</Button>}
      maxWidth="xl"
    >
      <Toolbar
        left={
          <>
            <SegmentedControl
              options={[
                { label: "All", value: "all" },
                { label: "Upcoming", value: "upcoming" },
              ]}
              value={seg}
              onChange={(v) => setSeg(v)}
            />
            <Chip selected={seg === "all"} onClick={() => setSeg("all")}>
              Chip All
            </Chip>
            <Badge>All-day</Badge>
          </>
        }
        right={
          <Stack direction="row" className="items-center gap-3">
            <Toggle checked={toggle} onChange={setToggle} label="All-day" />
            <Button size="sm" variant="primary">
              Primary
            </Button>
            <Button size="sm" variant="secondary">
              Secondary
            </Button>
            <Button size="sm" variant="ghost">
              Ghost
            </Button>
            <Button size="sm" variant="danger">
              Danger
            </Button>
          </Stack>
        }
      />

      <Grid columns={3}>
        <Card title="Typography">
          <Heading level={3}>Heading 3</Heading>
          <Text>Body text</Text>
          <Text muted>Muted text</Text>
        </Card>

        <Card title="Form">
          <Stack gap="sm">
            <FormField label="Title" required helperText="Required field">
              <Input placeholder="Event title" />
            </FormField>
            <FormField label="Description" helperText="Optional">
              <Input placeholder="Description" />
            </FormField>
            <FormField label="Duration" error="Duration must be >= 0">
              <Input type="number" error />
            </FormField>
          </Stack>
        </Card>

        <Card title="Buttons & Status">
          <Stack direction="row" className="flex-wrap gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Badge>Neutral</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="info">Info</Badge>
          </Stack>
        </Card>

        <Card title="Feedback">
          <Stack>
            <Banner>Info message</Banner>
            <Banner type="success">Success message</Banner>
            <Banner type="warning">Warning message</Banner>
            <Banner type="error">Error message</Banner>
            <Stack direction="row" className="items-center gap-2">
              <Spinner />
              <Skeleton width={120} height={16} />
              <Skeleton width={120} height={16} />
            </Stack>
          </Stack>
        </Card>

        <Card title="Layouts">
          <Surface>
            <Text>Surface block</Text>
          </Surface>
          <EmptyState
            title="No events"
            description="Add your first event"
            actionText="Create event"
            onAction={() => {}}
          />
        </Card>
      </Grid>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm action"
        primaryAction={{ label: "Confirm", onClick: () => setModalOpen(false) }}
        secondaryAction={{ label: "Cancel", onClick: () => setModalOpen(false) }}
      >
        This is a modal preview.
      </Modal>
    </PageShell>
  );
}
