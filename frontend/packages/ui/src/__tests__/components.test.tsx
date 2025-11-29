import { render, screen } from "@testing-library/react";
import React from "react";
import {
  Badge,
  Banner,
  Button,
  Card,
  Chip,
  EmptyState,
  FormField,
  Heading,
  Input,
  PageShell,
  SegmentedControl,
  Skeleton,
  Spinner,
  Stack,
  Surface,
  Text,
} from "..";

describe("UI primitives", () => {
  it("renders Surface content", () => {
    render(
      <Surface>
        <p>hello</p>
      </Surface>
    );
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("renders Button with label", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
  });

  it("renders Input with placeholder", () => {
    render(<Input placeholder="type here" />);
    expect(screen.getByPlaceholderText("type here")).toBeInTheDocument();
  });

  it("renders text and heading", () => {
    render(
      <Stack>
        <Heading level={3}>Title</Heading>
        <Text>Body</Text>
      </Stack>
    );
    expect(screen.getByText("Title").tagName.toLowerCase()).toBe("h3");
    expect(screen.getByText("Body")).toBeInTheDocument();
  });

  it("renders FormField helper text", () => {
    render(
      <FormField label="Email" helperText="We'll never share this">
        <Input />
      </FormField>
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("We'll never share this")).toBeInTheDocument();
  });

  it("renders Card and PageShell structure", () => {
    render(
      <PageShell title="Page" subtitle="Subtitle" actions={<Button>Action</Button>}>
        <Card title="Card title" actions={<Button size="sm">Small</Button>}>
          <Text>Card body</Text>
        </Card>
      </PageShell>
    );
    expect(screen.getByText("Page")).toBeInTheDocument();
    expect(screen.getByText("Subtitle")).toBeInTheDocument();
    expect(screen.getByText("Card title")).toBeInTheDocument();
    expect(screen.getByText("Card body")).toBeInTheDocument();
    expect(screen.getAllByRole("button").length).toBeGreaterThan(0);
  });

  it("renders chips/badges and segmented control", () => {
    render(
      <Stack direction="row" className="items-center">
        <Badge>All-day</Badge>
        <Chip selected>Selected</Chip>
        <SegmentedControl
          options={[
            { label: "All", value: "all" },
            { label: "Upcoming", value: "upcoming" },
          ]}
          value="all"
          onChange={() => {}}
        />
      </Stack>
    );
    expect(screen.getByText("All-day")).toBeInTheDocument();
    expect(screen.getByText("Selected")).toBeInTheDocument();
    expect(screen.getByText("Upcoming")).toBeInTheDocument();
  });

  it("renders feedback components", () => {
    render(
      <Stack>
        <Skeleton />
        <Spinner />
        <Banner>Info message</Banner>
        <EmptyState title="No events" description="Add your first event" />
      </Stack>
    );
    expect(screen.getByText("Info message")).toBeInTheDocument();
    expect(screen.getByText("No events")).toBeInTheDocument();
  });
});
