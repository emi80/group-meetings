# NGS Data Flow 

### Lab Meeting<!-- .element: style="margin-top: 1.2em;"-->

------

- Managing experiments, samples and assays data 

- Managing metadata

- Performing analyses

- Organizing and publishing raw data and results

------

# Management


## Experiment Data
<!-- .element: style="font-size: 2.8em"-->


## LIMS
`Laboratory Information Management System`

software-based management system with features that support a modern laboratory's operation <!-- panel -->

- workflow and data tracking
- electronic laboratory notebook (ELN)
- data mining and analysis
- enterprise resource planning



<!-- .slide: data-state="no-nav-bar" data-background="#111111" -->
<!-- .element: class="big light" -->
Do we need a LIMS?



## Maybe not...
<iframe style="width: 95%; height: 12em" data-src="../iframes/sheet.html"></iframe>


## Use Google Docs

- flexible attributes<!-- .element: class="icon plus" -->
- no need to learn how to use a new tool<!-- .element: class="icon plus" -->
- customization<!-- .element: class="icon plus" -->
- no consistency check/enforcing<!-- .element: class="icon minus" -->
- stored on Google servers<!-- .element: class="icon minus" -->


## Programmatic access

[Google Sheets API](https://developers.google.com/sheets/api/) allow to read, write, and format data in Sheets. Programmatically create and update pivot tables, data validation, charts and more.
<!-- panel -->

- `curl` access
- client libraries (e.g. `Python`, `Java`)


## Other documents

use a shared resource (Dropbox, remote folder) to store all documents related to libraries, sequences and data in general<!-- .element: class="panel panel-default" style="margin-top: 1.5em;" --> <i class="fa fa-question fa-lg blue"></i><i class="fa fa-question fa-lg red fa-rotate-180"></i>


## Metadata
<!-- .element: style="font-size: 2.8em"-->


## Controlled Vocabulary

- full control on attribute names and values<!-- .element: class="icon plus" -->
- definition of a fixed schema<!-- .element: class="icon minus" -->
- rigorous definition of predefined, authorised terms<!-- .element: class="icon minus" -->


## Metadata Attributes

Choose a common set of attributes which best describes the project, experiments and data and stick to it<!-- .element: class="panel panel-default" style="margin: 2em 0;"-->

1. unique identifier for each experiment/sample
1. description(s) - check verbosity
1. internal vs public attributes

------

# Analysis


## Primary Analysis

- common pipelines
- containerized processing ([Docker](https://www.docker.com)<!-- .element: class="extern" -->, [Singularity](http://singularity.lbl.gov)<!-- .element: class="extern" -->)
- data provenance
- [metadata](#/2/8) management


## RG pipelines
<!-- .element: style="margin-bottom: 0.5em;"-->

- grape-nf (also for riboprofiling) [<i class="fa fa-github fa-lg fa-right"></i>](https://github.com/guigolab/grape-nf)
- chip-nf [<i class="fa fa-github fa-lg fa-right"></i>](https://github.com/guigolab/chip-nf)
- ipsa-nf [<i  class="fa fa-github fa-lg fa-right"></i>](https://github.com/guigolab/ipsa-nf)

![Nextflow](../img/nextflow2014_no-bg.png)<!-- .element: style="height: 50px; "-->


## Containers

lightweight, stand-alone, executable packages of a piece of software that include everything needed to run it: code, runtime, system tools, system libraries, settings
<!-- .element: class="panel panel-default" style="margin: 2em 0;"-->

- will always run the same, regardless of the environment<!-- .element: class="icon plus" -->
- isolate software from its surroundings<!-- .element: class="icon plus" -->
- negligible runtime overhead<!-- .element: class="icon plus" -->
- container image preparation (software install, configuration)<!-- .element: class="icon minus" -->
- setup complexity/security<!-- .element: class="icon minus" -->


## Data Provenance

it refers to records of the inputs, entities, systems, and processes that influence data of interest, providing a historical record of the data and its origins
<!-- .element: class="panel panel-default" style="margin: 2em 0;"-->

- pipeline version
- software version
- container image hashe


## Other Analyses

- readme files
    - if the get messy and hard to manage <i class="fa fa-arrow-right blue"></i> explore specific bash history for analysis folders
- version control ([git](https://git-scm.com)<!-- .element: class="extern" --> recommended)
```bash
$ tree
.
├── my-script-20171012-fix-bug.py
├── my-script-20171012.py
├── my-script-20171014.py
├── my-script-20171014-v2.py
├── my-script-fix-bug.py
├── my-script-fix-bug-v2-my-project.py
├── my-script.py
└── my-script-v2.py
...
```
- publish script source on [GitHub](https://github.com)<!-- .element: class="extern" --> (and/or other online resource)
- [containerized processing](#/3/3)
- [data provenance](#/3/4)

------

# Storage


## Organize

- organize files in `project` folders
- store metadata information in a database
- keep a global index of the lab projects data (internal and external)


## Access

Common access operations and use cases <i class="fa fa-question fa-lg blue"></i> <i class="fa fa-question fa-lg red fa-rotate-180"></i>


## Publish

- personal web folder(`public_html`/`public-docs`)
- in-house web server (http://rnaseq.crg.es)<!-- .element: class="extern" -->
- public resources:
    - [NCBI SRA](https://www.ncbi.nlm.nih.gov/sra)<!-- .element: class="extern" -->
    - [EBI ArrayExpress](https://www.ebi.ac.uk/arrayexpress/)<!-- .element: class="extern" -->
- hybrid (in-house + public)

------

<!-- .slide: data-background-image="../img/thank-you.png" data-background-size="50%" data-background-color="#fff"> -->