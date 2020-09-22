---
title: "GA4GH"
date: "2017-02-01"
aliases: "/3"
outputs: ["Reveal"]
---

{{% section %}}

# Introduction

---

## Mission

Accelerate progress in human health by helping to establish a common framework of harmonized approaches to enable effective and responsible sharing of genomic and clinical data, and by catalyzing data sharing projects that drive and demonstrate the value of data sharing

<span class="rfooter">http://genomicsandhealth.org/</span>

---

## Organization

{{< figure src="Global-Alliance-how-we-work-v2.jpg" width="60%" class="plain" >}}

---

## Working Groups
<!-- .element: style="margin-bottom: 1em;"-->

- Clinical Working Group <!-- .element: style="margin-bottom: 0.5em;"-->
- Data Working Group <!-- .element: style="margin-bottom: 0.5em;"-->
- Regulatory and Ethics Working Group <!-- .element: style="margin-bottom: 0.5em;"-->
- Security Working Group

{{% /section %}}

---

{{% section %}}

# Data Working Group

http://ga4gh.org/

---

## Objective

create global standards and tools for the secure, privacy respecting and interoperable sharing of Genomic data

---

## Genomics API

{{< figure src="GA4GH_API_interop.png" width="70%" class="plain" >}}

[GA4GH Documentation](http://ga4gh.org/#/documentation)

---

## Use cases

- Enabling Genomics-Based Patient Risk Assessment: BRCA1 Information Consolidation and Interpretation
- Combining Genomes Across Sites enabling Research for Cancer and Rare/Undiagnosed Diseases
- Identifying Microorganisms
- Predicting Drug Response and Integration with Electronic Medical Records for Research
- Prenatal Testing

---

## Working Task Teams

- Benchmarking
- Containers and Workflows
- File Formats
- Metadata
- Reference Genomes
- <span class="blue">RNA and Gene Expression</span>
- Variant Annotation
- <span class="green">Reads</span>
- <span class="green">Genotype to phenotype</span>

---

## RNAseq Task Team

The RNA and Gene Expression Task Team provides APIs to interoperably store, process, explore, and share RNA sequence reads, computed transcript structures, and their expression levels.

<span class="rfooter">http://ga4gh.org/#/rnaseq-team</span>

{{% /section %}}

---

{{% section %}}

# Genomics API

---

## Interoperability

interoperable exchange of genomic information across multiple organizations and on multiple platforms

- open standard for interoperability, that uses common web protocols to support serving and sharing of data

- webservice to create a data source which may be integrated into
  - visualization software
  - web-based genomics portals
  - genomic analysis pipelines

---

## API Goals

- allow flexibility in server implementation (e.g. persistence backend, language, authorization model, scale)
- allow full-fidelity representation of data
- allow adding more structure to data (e.g. formal provenance, versioning)
- allow data owners to organize their data in ways that make sense to them

At the same time, the API should encourage reusable organization, anticipating a future that supports cross-researcher and cross-repository data federation

---

## Web API

A server-side web API is a programmatic interface consisting of one or more publicly exposed endpoints to a defined request-response message system, typically expressed in `JSON` or `XML`, which is exposed via the web - most commonly by means of an `HTTP`-based web server

<span class="rfooter">[Wikipedia](https://en.wikipedia.org/wiki/Web_API)</span>

---

## Schemas

The API consists of a series of schemas that define the types of things that API clients and servers exchange: requests for data, server responses, error messages, and objects actually representing pieces of genomics data

On the wire, the GA4GH web API takes the form of a client and a server exchanging `JSON`-serialized objects over `HTTP` or `HTTPS`

---

## RNA Quantification API

provides a means of obtaining feature level quantifications derived from a set of RNA reads

---

## RNA Quantification Schema

The RNA Quantification Schema is designed around a quantification analysis. Each set of feature quantifications describes the results of running an analysis on a set of input data

---

## RnaQuantificationSet

collects a group of related `RnaQuantifications`

__E.g.__: a time course experiment would be described by a `RnaQuantificationSet` with the individual RNASeq experiments of the time point being represented as the member `RnaQuantifications`

<span class="rfooter">[schema](https://ga4gh-schemas.readthedocs.io/en/latest/schemas/rna_quantification.proto.html#protobuf.RnaQuantificationSet)</span>

---

## RnaQuantification

describes the analysis pipeline used as well as the input reads dataset and which sequence annotations, if any, used.

<span class="rfooter">[schema](https://ga4gh-schemas.readthedocs.io/en/latest/schemas/rna_quantification.proto.html#protobuf.RnaQuantification)</span>

---

## ExpressionLevel

contains the identity of the specific feature measured as well as the final resulting quantification from the pipeline.

<span class="rfooter">[schema](https://ga4gh-schemas.readthedocs.io/en/latest/schemas/rna_quantification.proto.html#protobuf.ExpressionLevel)</span>

---

## Use cases

1. Obtain quantification data for one or more features (genes) in an RNASeq experiment
1. Obtain quantification data for one or more features (genes) for comparison between multiple RNASeq experiments
1. Obtain input data to use in Assembly activities
1. Obtain input data for DESeq Differential Expression analysis
1. Obtain input data for RNASeq analysis by Kallisto software
1. Obtain quantification data for non-read-based RNA experiments (MicroArrays)

{{% /section %}}

---

{{% section %}}

# Reference server

---

## Implementation

A reference implementation of the APIs is under development and consists of three main components:

- schemas
- server
- client

Server and client are currently under heavy development, and many aspects of the layout and APIs will change as requirements are better understood

---

## Schemas

Written in [Protocol Buffers](https://developers.google.com/protocol-buffers/docs/overview#whynotxml) Interface Description Language, e.g.

```proto
message RnaQuantificationSet {
  // The RNA quantification set ID.
  string id = 1;

  // The ID of the dataset this RNA Quantification set belongs to.
  string dataset_id = 2;

  // The RNA quantification set name.
  string name = 3;
}
```

Specification through Protocol buffer `message` types in `.proto` files. Each `message` is a small logical record of information, containing a series of name-value pairs.

https://github.com/ga4gh/schemas

---

## Server

- written in Python (Python 2 support only)
- Flask Web framework
- SQLite persistence backend

https://github.com/ga4gh/server

---

## Client

- written in Python (Python 2 support only)
- API library
- command line tool

https://github.com/ga4gh/ga4gh-client

---

## Demo server

A demo server instance hosting `Thousand Genomes Project` data is available

http://1kgenomes.ga4gh.org

---

## Demo notebooks

Example `IPython` notebooks are also available

http://github.com/BD2KGenomics/bioapi-examples/tree/master/python_notebooks

{{% /section %}}

---

{{% section %}}

# RNA API demo

---

## Driving projects

__RGLab__ in collaboration with the __EGA team__ will provide a reference server instance loaded with `CLL` quantification data as a driving project to perform real life benchmarks/comparisons in the context of the RNAseq Task Team

---

## Data

Use quantification data from:

1. processing `CLL` (Chronic Lymphocytic Leukemia) RNAseq data
  - at __RGLab__ with GRCh38/Gencode 25
1. processing an `ENCODE` dataset
  - at __Caltech__ with GRCh38/Gencode 25
1. already processed `BeatAML` (Acute Myeloid Leukemia) RNAseq data
  - at __Broad__ with GRCh37/Gencode ?

---

## GA4GH server instances

1. `CLL` data server instance - __EGA__
1. `ENCODE` and BeatAML server instance - __Caltech__

---

## Comparisons

- `1` vs `2` as a `CLL` vs `control` looking for differential expression
- `1` vs `3` as a _"we found 2 datasets online, how do they compare?"_ to see what advice/pitfalls we can illustrate

all comparision will be performed by means of the API

---

## Work in progress

- running `GRAPE` pipeline on `CLL` RNAseq data
- setting up `GA4GH` server instance

`CLL` dataset: `EGAD00001001443`, 199 samples

{{% /section %}}

---

# Possible Applications

- GRAPE API support
- ERC data portal
- server instance with all projects from the lab

---

{{< slide class=thanks >}}
# Thanks!

---

{{% section %}}

{{< slide class=extra >}}
# Client Examples

---

{{< slide class=extra >}}
## Search datasets

```bash
$ ga4gh_client datasets-search http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiXQ  1kgenomes
```

---

{{< slide class=extra >}}
## Search feature sets (annotations)

```bash
$ ga4gh_client featuresets-search --datasetId WyIxa2dlbm9tZXMiXQ http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd  gencode_v24lift37
```

---

{{< slide class=extra >}}
## Search genes within genomic region

```bash
$ ga4gh_client features-search -F WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd -t gene -r chr1 -s 10000 -e 15000 http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyIsIjE0MDUwOTE4MzA4ODMzNiJd    WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd  chr1  11869 14409 2 FeatureType: SO:0000704 gene  gene_status:values {
  string_value: "KNOWN"
}
; havana_gene:values {
  string_value: "OTTHUMG00000000961.2"
}
; remap_target_status:values {
  string_value: "overlap"
}
; level:values {
  string_value: "2"
}
; remap_num_mappings:values {
  string_value: "1"
}
; gene_id:values {
  string_value: "ENSG00000223972.5"
}
; gene_type:values {
  string_value: "transcribed_unprocessed_pseudogene"
}
; remap_status:values {
  string_value: "full_contig"
}
; ID:values {
  string_value: "ENSG00000223972.5"
}
; gene_name:values {
  string_value: "DDX11L1"
}
;
WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyIsIjE0MDUwOTE4MzA5MDUxMiJd    WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd  chr1  14404 29570 1 FeatureType: SO:0000704 gene  gene_status:values {
  string_value: "KNOWN"
}
; havana_gene:values {
  string_value: "OTTHUMG00000000958.1"
}
; remap_target_status:values {
  string_value: "overlap"
}
; level:values {
  string_value: "2"
}
; remap_num_mappings:values {
  string_value: "1"
}
; gene_id:values {
  string_value: "ENSG00000227232.5"
}
; gene_type:values {
  string_value: "unprocessed_pseudogene"
}
; remap_status:values {
  string_value: "full_contig"
}
; ID:values {
  string_value: "ENSG00000227232.5"
}
; gene_name:values {
  string_value: "WASH7P"
}
;
```

---

{{< slide class=extra >}}
## Search RNA quantification sets

```bash
$ ga4gh_client rnaquantificationsets-search --datasetId WyIxa2dlbm9tZXMiXQ http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iXQ  WyIxa2dlbm9tZXMiXQ  E-GEUV-1 RNA Quantification
```

---

{{< slide class=extra >}}
## Search RNA quantifications

```bash
$ ga4gh_client rnaquantifications-search --rnaQuantificationSetId WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iXQ http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0Il0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00104 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTAzIl0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00103 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTAyIl0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00102 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTAxIl0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00101 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTAwIl0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00100 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMDk5Il0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00099 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMDk2Il0 RNA seq data from lymphoblastoid cell lines in the 1000 Genome Project, http://www.ebi.ac.uk/arrayexpress/experiments/E-GEUV-1/samples/ HG00096 WyIxa2dlbm9tZXMiLCJnZW5jb2RlX3YyNGxpZnQzNyJd
```

---

{{< slide class=extra >}}
## Search expression levels

```bash
$ ga4gh_client expressionlevels-search --rnaQuantificationId WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0Il0 http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiMzIxNWY3ZDgtNTNkZC00ZDU1LTgyMTUtZGZlOTMwMmEwZDBiIl0 3.17871 ENST00000619216.1 True  1.5 0.0 2
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiNWEwZDY4OGItNDMyMC00Y2IzLWJkNzktNDc5MGJkNjI5NWU4Il0 0.161336  ENST00000469289.1 True  1.13687 0.0 2
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiZjkyZTA3YjMtMzhjMC00YjcxLTlhMDYtNDJiOTZlMDhhYWU2Il0 1.92349 ENST00000461467.1 True  15.7391 0.0 2
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiOGFhNjk2YzItYTgwOS00YzQxLWIyZTAtOWM0ZTdhNGFlNGZlIl0 0.695846  ENST00000466430.5 True  36.7243 0.0 2
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiYjk4OGRlNjItOTFkNy00ZTBkLThmOTktNjNlYTEwZTk0NzZhIl0 0.00767201  ENST00000495576.1 True  0.178346  0.0 2
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiYTc5N2ViZGQtZjFlZS00NjgyLWE3OWYtNTFmOTA2NWZiMDA3Il0 0.854432  ENST00000493797.1 True  2.34793 0.0 2
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiYjE1ZGQyOGEtYWVlMC00ZGM2LTlkNmItNGNhMTAzZDRhMTQwIl0 0.662482  ENST00000484859.1 True  63.8771 0.0 2
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiYTFmNGYwOTQtOWY0Zi00ZWIzLTg0OTUtOTJmOTBkOTFkNmMyIl0 1.04408 ENST00000466557.6 True  23.8826 0.0 2
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiODU1NWFkOGYtOGFlNy00OTRjLTlkY2QtZDJhNDg0MDBiZmJlIl0 0.150866  ENST00000410691.1 True  0.0882353 0.0 2
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiMzgyNzFhNmEtMzQzYS00YmZmLWJlMDktNzRiMGVhN2YxODYxIl0 0.919041  ENST00000496488.1 True  5.0 0.0 2
...
```

---

{{< slide class=extra >}}
## Search expression level of a gene

```bash
$ ga4gh_client expressionlevels-search --rnaQuantificationId WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0Il0 --featureIds ENST00000525634.5 http://1kgenomes.ga4gh.org
```
```
WyIxa2dlbm9tZXMiLCJFLUdFVVYtMSBSTkEgUXVhbnRpZmljYXRpb24iLCJIRzAwMTA0IiwiRU5TVDAwMDAwNTI1NjM0LjVIRzAwMTA0Il0 11914.7 ENST00000525634.5 True  11914.7 0.0 2
```

{{% /section %}}
