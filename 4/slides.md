# NGS Data Flow 

### Lab Meeting<!-- .element: style="margin-top: 1.2em;"-->

------

- Managing experiments, samples and assays data 

- Managing metadata

- Performing analyses

- Publishing raw data and results

------

# Experiment Management


<!-- .slide: data-state="no-nav-bar" data-background="#111111" -->
<!-- .element: class="big light" -->
Do we need a LIMS/Electronic Notebook?



## Maybe not...
<iframe style="width: 95%; height: 12em" data-src="../iframes/sheet.html"></iframe>


## Use Google Docs

- flexible attributes<!-- .element: class="icon plus" -->
- no need to learn how to use a new tool<!-- .element: class="icon plus" -->
- customization<!-- .element: class="icon plus" -->
- no consistency check/enforcing<!-- .element: class="icon minus" -->
- stored on Google servers<!-- .element: class="icon minus" -->


## Other documents

use a shared resource (Dropbox, remote folder) to store all documents related to libraries, sequences and data in general<!-- .element: class="panel panel-default" style="margin-top: 1.5em;" --> <i class="fa-question fa-lg blue"></i><i class="fa-question fa-lg red fa-rotate-180"></i>

------

# Metadata Management


## Controlled Vocabulary

- full control on attribute names and values<!-- .element: class="icon plus" -->
- needs the definition of a fixed schema<!-- .element: class="icon minus" -->
- needs time for rigorous definition of predefined, authorised terms<!-- .element: class="icon minus" -->


## Metadata Attributes

Choose a common set of attributes which best describes the project, experiments and data and stick to it<!-- .element: class="panel panel-default" style="margin: 2em 0;"-->

1. unique identifier for each experiment/sample
1. description(s) - check verbosity
1. internal vs public attributes

------

# Data Analysis


## Primary Analysis

- use common pipelines
- containerized processing ([Docker](https://www.docker.com)<!-- .element: class="extern" -->, [Singularity](http://singularity.lbl.gov)<!-- .element: class="extern" -->)
- data provenance
- [metadata](#/3) management


## RG pipelines
<!-- .element: style="margin-bottom: 0.5em;"-->

- grape-nf (also for riboprofiling) [<i style="float: right; margin-left: 0.5em;" class="fa-github fa-lg"></i>](https://github.com/guigolab/grape-nf)
- chip-nf [<i style="float: right;" class="fa-github fa-lg"></i>](https://github.com/guigolab/chip-nf)
- ipsa-nf [<i style="float: right;" class="fa-github fa-lg"></i>](https://github.com/guigolab/ipsa-nf)

![Nextflow](../img/nextflow2014_no-bg.png)<!-- .element: style="height: 50px; "-->


## Containers

a lightweight, stand-alone, executable package of a piece of software that includes everything needed to run it: code, runtime, system tools, system libraries, settings
<!-- .element: class="panel panel-default" style="margin: 2em 0;"-->

- containerized software will always run the same, regardless of the environment<!-- .element: class="icon plus" -->
- containers isolate software from its surroundings<!-- .element: class="icon plus" -->
- negligible runtime overhead<!-- .element: class="icon plus" -->
- image preparation<!-- .element: class="icon minus" -->
- setup complexity/security<!-- .element: class="icon minus" -->


## Data Provenance

it refers to records of the inputs, entities, systems, and processes that influence data of interest, providing a historical record of the data and its origins
<!-- .element: class="panel panel-default" style="margin: 2em 0;"-->

- pipeline version
- software version
- container image hashe


## Other Analyses

- readme files are ok but can get messy and hard to manage <i class="fa fa-arrow-right blue"></i> can use specific bash history for analysis folders
- use version control ([git](https://git-scm.com)<!-- .element: class="extern" --> recommended)
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
- store [data provenance](#/4/3)

------

# Data Publishing


## Strategies

- personal web folder(`public_html`/`public-docs`)
- in-house web server (http://rnaseq.crg.es)<!-- .element: class="extern" -->
- public resources:
    - [NCBI SRA](https://www.ncbi.nlm.nih.gov/sra)<!-- .element: class="extern" -->
    - [EBI ArrayExpress](https://www.ebi.ac.uk/arrayexpress/)<!-- .element: class="extern" -->
- hybrid (in-house + public)

------

<!-- .slide: data-background-image="../img/thank-you.png" data-background-size="50%" data-background-color="#fff"> -->