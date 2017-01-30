# ![GA4GH](http://genomicsandhealth.org/files/logo_ga.png)<!-- .element: style="width: 70%; box-shadow: none; margin-bottom: 0em;"-->

<!-- .element: style="margin-top: 1.2em;"-->
### Lab Meeting

------

# Introduction


## Mission
<!-- .element: style="margin-bottom: 0.6em;"-->

<!-- panel->(blue) -->
Accelerate progress in human health by helping to establish a common framework of harmonized approaches to enable effective and responsible sharing of genomic and clinical data, and by catalyzing data sharing projects that drive and demonstrate the value of data sharing.

<!-- .element: class="footer"-->
http://genomicsandhealth.org/


## Organization

![](http://genomicsandhealth.org/files/Global-Alliance-how-we-work-v2.jpg)<!-- .element: style="width: 70%; box-shadow: none;margin-bottom: 0em;"-->


## Working Groups
<!-- .element: style="margin-bottom: 0.6em;"-->

- Clinical Working Group
- Data Working Group
- Regulatory and Ethics Working Group
- Security Working Group

------

# Data Working Group
<!-- .element: style="margin-bottom: 0.5em;"-->

http://ga4gh.org/


## Objective
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
create global standards and tools for the secure, privacy respecting and interoperable sharing of Genomic data


## Genomics API

![](http://ga4gh.org/assets/images/documentation/GA4GH_API_interop.png)<!-- .element: style="width: 80%; box-shadow: none;margin-bottom: 0em;"-->

<!-- .element: class="footer" style="bottom:0%; left: 10%;"-->
[GA4GH Documentation](http://ga4gh.org/#/documentation)


## Use cases
<!-- .element: style="margin-bottom: 1em;"-->

- Enabling Genomics-Based Patient Risk Assessment: BRCA1 Information Consolidation and Interpretation
- Combining Genomes Across Sites enabling Research for Cancer and Rare/Undiagnosed Diseases
- Identifying Microorganisms
- Predicting Drug Response and Integration with Electronic Medical Records for Research
- Prenatal Testing


## Working Task Teams
<!-- .element: style="margin-bottom: 1em;"-->

- Benchmarking
- Containers and Workflows
- File Formats
- Metadata
- Reference Genomes
- RNA and Gene Expression <!-- .element: class="blue"-->
- Variant Annotation
- Reads <!-- .element: class="green" style="margin-top: 0.5em;"-->
- Genotype to phenotype <!-- .element: class="green"-->


## RNAseq Task Team
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
The RNA and Gene Expression Task Team provides APIs to interoperably store, process, explore, and share RNA sequence reads, computed transcript structures, and their expression levels.

<!-- .element: class="footer" -->
http://ga4gh.org/#/rnaseq-team

------

# Genomics API


## Interoperability
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
interoperable exchange of genomic information across multiple organizations and on multiple platforms

- open standard for interoperability, that uses common web protocols to support serving and sharing of data <!-- .element: style="margin-bottom: 1em;"-->
- webservice to create a data source which may be integrated into
  - visualization software <!-- .element: style="margin-top: 0.2em;"-->
  - web-based genomics portals
  - genomic analysis pipelines


## API Goals
<!-- .element: style="margin-bottom: 1em;"-->

- allow flexibility in server implementation (e.g. persistence backend, language, authorization model, scale)
- allow full-fidelity representation of data
- allow adding more structure to data (e.g. formal provenance, versioning)
- allow data owners to organize their data in ways that make sense to them

<!-- panel->(blue) -->
<!-- .element: style="margin-top: 1em;"-->
At the same time, the API should encourage reusable organization, anticipating a future that supports cross-researcher and cross-repository data federation


## Web API
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
A server-side web API is a programmatic interface consisting of one or more publicly exposed endpoints to a defined request-response message system, typically expressed in `JSON` or `XML`, which is exposed via the web - most commonly by means of an HTTP-based web server.

<!-- .element: class="footer" -->
[Wikipedia](https://en.wikipedia.org/wiki/Web_API)


## Schemas
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
The API consists of a series of schemas that define the types of things that API clients and servers exchange: requests for data, server responses, error messages, and objects actually representing pieces of genomics data.

<!-- panel -->
<!-- .element: style="margin-top: 1em;"-->
On the wire, the GA4GH web API takes the form of a client and a server exchanging JSON-serialized objects over HTTP or HTTPS


## RNA Quantification API
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
provides a means of obtaining feature level quantifications derived from a set of RNA reads


## RNA Quantification Schema
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
The RNA Quantification Schema is designed around a quantification analysis. Each set of feature quantifications describes the results of running an analysis on a set of input data


## RnaQuantificationSet 
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
collects a group of related `RnaQuantifications`

<!-- panel -->
<!-- .element: style="margin-top: 2em;"-->
__E.g.__: a time course experiment would be described by a `RnaQuantificationSet` with the individual RNASeq experiments of the time point being represented as the member `RnaQuantifications`

<!-- .element: class="footer" style="bottom: -20%;" -->
[schema](https://ga4gh-schemas.readthedocs.io/en/latest/schemas/rna_quantification.proto.html#protobuf.RnaQuantificationSet)


## RnaQuantification 
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
describes the analysis pipeline used as well as the input reads dataset and which sequence annotations, if any, used.

<!-- .element: class="footer" style="bottom: -72%;" -->
[schema](https://ga4gh-schemas.readthedocs.io/en/latest/schemas/rna_quantification.proto.html#protobuf.RnaQuantification)


## ExpressionLevel 
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
contains the identity of the specific feature measured as well as the final resulting quantification from the pipeline.

<!-- .element: class="footer" style="bottom: -72%;" -->
[schema](https://ga4gh-schemas.readthedocs.io/en/latest/schemas/rna_quantification.proto.html#protobuf.ExpressionLevel)


## Use cases
<!-- .element: style="margin-bottom: 1em;"-->

1. Obtain quantification data for one or more features (genes) in an RNASeq experiment <!-- .element: style="margin-bottom: 0.5em;"-->
1. Obtain quantification data for one or more features (genes) for comparison between multiple RNASeq experiments <!-- .element: style="margin-bottom: 0.5em;"-->
1. Obtain input data to use in Assembly activities <!-- .element: style="margin-bottom: 0.5em;"-->
1. Obtain input data for DESeq Differential Expression analysis <!-- .element: style="margin-bottom: 0.5em;"-->
1. Obtain input data for RNASeq analysis by Kallisto software <!-- .element: style="margin-bottom: 0.5em;"-->
1. Obtain quantification data for non-read-based RNA experiments (MicroArrays)

------

# Reference server


<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
A reference implementation of the APIs is under development

https://github.com/ga4gh/server


## Demo server
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
A demo server instance hosting `Thousand Genomes Project` data is available

http://1kgenomes.ga4gh.org


## Demo notebooks
<!-- .element: style="margin-bottom: 1em;"-->

<!-- panel->(blue) -->
<!-- .element: style="margin-bottom: 2em;"-->
Example `IPython` notebooks are also available

http://github.com/BD2KGenomics/bioapi-examples/tree/master/python_notebooks

------

# RNA API benchmark


## Driving projects
<!-- .element: style="margin-bottom: 0.8em;"-->

<!-- panel -->
RGLab in collaboration with the EGA team will provide a reference server instance loaded with CLL quantification data as a driving project to perform real life benchmarks/comparisons in the context of the RNAseq Task Team


## Data
<!-- .element: style="margin-bottom: 0.8em;"-->

Use quantification data from:
<!-- .element: style="margin-bottom: 1em; text-align: left; padding-left: 5em;"-->

1. processing `CLL` RNAseq data 
  - at RGLab with GRCh38/Gencode 25
1. processing an `ENCODE` dataset 
  - at Caltech with GRCh38/Gencode 25
1. already processed `BeatAML` data
  - at Broad with GRCh38/Gencode ?


## GA4GH server instances
<!-- .element: style="margin-bottom: 0.8em;"-->

1. `CLL` data server instance - EGA 
1. `ENCODE` and BeatAML server instance - Caltech


## Comparisons
<!-- .element: style="margin-bottom: 0.8em;"-->

- `1` vs `2` as a `CLL` vs `control` looking for differential expression
- `1` vs `3` as a _"we found 2 datasets online, how do they compare?"_ to see what advice/pitfalls we can illustrate

<!-- panel->(red) -->
<!-- .element: style="margin-top: 1em;"-->
all comparision will be performed by means of the API

------

## Thanks!
<!-- .element: style="font-size: 3.2em;"-->
