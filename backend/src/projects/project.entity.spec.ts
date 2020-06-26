import { Project } from './project.entity';

describe('Project entity', () => {
  it('should make an project with no fields', () => {
    const project = new Project();

    expect(project).toBeDefined();
    expect(project.id).toBe(undefined);
    expect(project.name).toBe(undefined);
    expect(project.description).toBe(undefined);
    expect(project.startDate).toBe(undefined);
    expect(project.endDate).toBe(undefined);
  });

  it('should make an project with some fields', () => {
    const project = new Project(
      0,
      'project name',
      'project description',
      undefined,
    );

    expect(project).toBeDefined();
    expect(project.id).toBe(0);
    expect(project.name).toBe('project name');
    expect(project.description).toBe('project description');
    expect(project.startDate).toBe(undefined);
    expect(project.endDate).toBe(undefined);
  });

  it('should make an project with all fields', () => {
    const project = new Project(
      1,
      'spark',
      'A simple cli to input and store your ideas directly with git and without a text editor',
      new Date('2020/06/05'),
      new Date('2020/06/15'),
    );

    expect(project).toBeDefined();
    expect(project.id).toBe(1);
    expect(project.name).toBe('spark');
    expect(project.description).toBe(
      'A simple cli to input and store your ideas directly with git and without a text editor',
    );
    expect(project.startDate.toDateString()).toBe(new Date('2020/06/05').toDateString());
    expect(project.endDate.toDateString()).toBe(new Date('2020/06/15').toDateString());
  });
});
