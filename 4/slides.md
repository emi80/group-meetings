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
- electronic laboratory notebook (`ELN`)
- data mining and analysis
- enterprise resource planning



<!-- .slide: data-state="no-nav-bar" data-background="#111111" -->
<!-- .element: class="big light" -->
Do we need a LIMS?


## Maybe not...
<!-- .element: style="margin-top: 0.5em;" -->
<iframe class="stretch" data-src="../iframes/sheet.html"></iframe>


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

use a shared resource (Dropbox, remote folder) to store all documents related to libraries, sequences and data in general<!-- panel --> <i class="fa fa-question fa-lg blue"></i><i class="fa fa-question fa-lg red"></i>


## Metadata
<!-- .element: style="font-size: 2.8em"-->


## Controlled Vocabulary

- standard and interoperable<!-- .element: class="icon plus" -->
- full control on attribute names and values<!-- .element: class="icon plus" -->
- rigorous definition of schemas and predefined, authorised terms<!-- .element: class="icon minus" -->
- sometimes too complex <!-- .element: class="icon minus" -->
- sometimes lacking property(ies) <!-- .element: class="icon minus" -->


## Metadata Attributes

choose a common set of attributes which best describes the project, experiments and data and stick to it<!-- panel -->

1. unique identifier for each experiment/sample
1. description fields - check verbosity
1. internal vs public attributes
1. map to standard metadata models (subset) (e.g. [IHEC](https://github.com/IHEC/ihec-metadata))
------

# Analysis


## Primary Analysis

- common pipelines
- containerized processing ([Docker](https://www.docker.com)<!-- .element: class="extern" -->, [Singularity](http://singularity.lbl.gov)<!-- .element: class="extern" -->)
- data provenance
- [metadata](#/2/8) management


## RG pipelines

- grape-nf (also for riboprofiling) [<i class="fa fa-github fa-lg fa-right"></i>](https://github.com/guigolab/grape-nf)
- chip-nf [<i class="fa fa-github fa-lg fa-right"></i>](https://github.com/guigolab/chip-nf)
- ipsa-nf [<i  class="fa fa-github fa-lg fa-right"></i>](https://github.com/guigolab/ipsa-nf)

![Nextflow](../img/nextflow2014_no-bg.png)<!-- .element: style="height: 50px; "-->


## grape-nf IHEC

- switch `samtools` to [`sambamba`](http://lomereiter.github.io/sambamba/)<!-- .element: class="extern" --> (faster and more flexible)
- add read trimming step
- provide IHEC read `QC metrics`:
    - % mapped
    - % intergenic
    - % ribosomal
    - % duplicate
- output results in a ordered folder structure (e.g. by experiment or data type)


## Containers

lightweight, stand-alone, executable packages of a piece of software that include everything needed to run it: code, runtime, system tools, system libraries, settings
<!-- panel -->

- will always run the same, regardless of the environment<!-- .element: class="icon plus" -->
- isolate software from its surroundings<!-- .element: class="icon plus" -->
- negligible runtime overhead<!-- .element: class="icon plus" -->
- container image preparation (software install, configuration)<!-- .element: class="icon minus" -->
- setup complexity/security<!-- .element: class="icon minus" -->


## Data Provenance

records of the inputs, entities, systems, and processes that influence data of interest, providing a historical record of the data and its origins
<!-- panel -->

- pipeline version
- pipeline profile
- software version
- container image hash


## Other Analyses

- avoid (big) input data replication (e.g. `scRNA-seq` quantification matrix)
- use
    - readme files or similar (e.g. specific `bash history` per analysis folder) 
    -  version control ([git](https://git-scm.com)<!-- .element: class="extern" --> recommended)
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
    - [containerized processing](#/3/3)
    - [data provenance](#/3/4)
- publish script source on online resources like [GitHub](https://github.com)<!-- .element: class="extern" --> 

------

# Storage


## Organize

- organize files in `project` folders
- store metadata information for easy retrieval (e.g. `database`, `index-file`)
- keep a global index of lab projects data (`internal` and `external`)


## Access

generally using `grep`/`awk` to match text on metadata files

define common policies, operations and use cases in order to optimize storage, retrieval and manipulation<!-- panel->(blue) --> <i class="fa fa-question fa-lg blue"></i><i class="fa fa-question fa-lg red"></i>


## Publish

- personal web folder (`public_html` or `public-docs`)
- in-house web server (e.g. next slides)<!-- .element: class="extern" -->
- public resources:
    - [NCBI SRA](https://www.ncbi.nlm.nih.gov/sra)<!-- .element: class="extern" -->
    - [EBI ArrayExpress](https://www.ebi.ac.uk/arrayexpress/)<!-- .element: class="extern" -->
- hybrid (in-house + public)


<iframe class="stretch" data-src="http://rnaseq.crg.eu/project/ENCODE/"></iframe>

[Old Grape RNAseq @ CRG](http://rnaseq.crg.eu)


<iframe class="stretch" data-src="http://rnamaps.crg.eu"></iframe>

[RNAmaps @ CRG](http://rnamaps.crg.eu)

------

# Tools


## Development
build a standalone tool for data management and access <!-- panel->(green) -->

- simple user interface
- persistence of data and metadata (using a `key-value` store)
- optimized import and update
- fast information retrieval and manipulation


## Config

```toml
# Tool configuration file

[data]
id = "labExpId"

[data.provider]
name = "google"
refId = "10RfO935tMhntsPPOjjCV6LSpfXlw94lQF103GBzsLYQ"
dataTypes = [
	"Protein Human",
	"RNA-seq Human",
	"ChIP-seq Human",
	"RiboProfiling Human",
	"RNA-seq Mouse",
	"RNA drosophila",
	"ChIPs drosophila",
]
attributes = [
	"Antibody",
	"Antibody Batch",
	"Antibody Reference",
	"Barcode Sequence",
	"Compartment",
	"Data Type",
	"Description",
	"Experiment",
	"Experiment Date",
	"Experiment Type",
	"Fraction",
	"Genotype Or Cell",
	"LabExpId",
	"Library Peak",
	"Library Type",
	"Number Of Reads",
	"Organism",
	"Platform",
	"RIN",
	"RNA Extract",
	"Read Length",
	"Replicate",
	"Run Date",
	"Run Id",
	"Run Lane",
	"Sample Type",
	"Sex",
	"Stage",
	"Status",
	"Strand Specificity",
	"Time",
	"Tissue",
]
```


## Usage

```
tool command

Usage:
  tool [command]

Available Commands:
  help        Help about any command
  import      Import data from provider
  show        Retrieve data and metadata
  add         Add data and metadata to the index

Flags:
      --config string   The config file to use (default "config")
      --db string       The database (default "db")
  -h, --help            help for idx
```
------

<!-- .slide: data-background-image="../img/thank-you.png" data-background-size="50%" data-background-color="#fff"> -->